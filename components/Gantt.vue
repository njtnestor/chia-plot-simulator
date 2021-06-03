<template>
  <div ref="gantt" class="gantElement" />
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
dayjs.extend(utc)

export default {
  name: 'Gantt',
  data () {
    return {
      file: undefined
    }
  },

  mounted () {
    this.$gantt().config.start_date = dayjs().startOf('day').toDate()
    this.$gantt().config.end_date = dayjs().add(1, 'day').startOf('day').toDate()
    this.$gantt().config.fit_tasks = true
    this.$gantt().config.round_dnd_dates = false
    this.$gantt().config.time_step = 1
    this.$gantt().config.min_column_width = 100
    this.$gantt().config.scale_height = 50
    this.$gantt().config.grid_width = 500
    this.$gantt().config.duration_unit = 'minute'
    this.$gantt().config.date_grid = '%Y-%m-%d %H:%i'
    this.$gantt().config.drag_progress = false
    this.$gantt().config.drag_links = false

    this.$gantt().config.scales = [
      { unit: 'hour', step: 1, format: '%Hh' },
      { unit: 'day', step: 1, format: '%Y-%m-%d, %D' }

    ]
    this.$gantt().config.columns = [
      // { name: 'text', label: 'Task name', width: '*', tree: true },
      { name: 'start_date', label: this.$t('ganttPage.fields.startDate'), align: 'center', width: 120 },
      {
        name: 'duration',
        label: this.$t('ganttPage.fields.duration'),
        align: 'center',
        width: 80,
        sort: false,
        template ({ totalTime }) {
          if (!totalTime) return ''
          const hours = Math.trunc(totalTime / 60 / 60)
          const minutes = Math.trunc(totalTime / 60 % 60)
          const seconds = Math.trunc(totalTime % 60)
          return dayjs
            .duration({ hours, minutes, seconds })
            .format('HH:mm:ss')
        }
      },
      { name: 'threads', label: this.$t('ganttPage.fields.threads'), align: 'center', width: 50, sort: false },
      { name: 'ram', label: this.$t('ganttPage.fields.ram'), align: 'center', width: 90, sort: false }
    ]

    this.$gantt().plugins({
      tooltip: true
    })
    const zoomConfig = {
      levels: [
        {
          name: 'day',
          min_column_width: 80,
          scales: [
            { unit: 'day', step: 1, format: '%d %M, %D' }
          ]
        },
        {
          name: 'hour',
          min_column_width: 30,
          scales: [
            { unit: 'hour', step: 1, format: '%Hh' },
            { unit: 'day', step: 1, format: '%d %M, %D' }
          ]
        },
        {
          name: 'minute',
          min_column_width: 30,
          scales: [
            { unit: 'minute', step: 15, format: '%i' },
            { unit: 'hour', step: 1, format: '%Hh' }
          ]
        }
      ],
      useKey: 'ctrlKey',
      trigger: 'wheel',
      element: () => {
        return this.$gantt().$root.querySelector('.gantt_task')
      }
    }
    this.$gantt().config.readonly = true
    this.$gantt().config.drag_resize = false
    this.$gantt().config.drag_move = false
    this.$gantt().config.order_branch = true
    this.$gantt().config.sort = true
    this.$gantt().ext.zoom.init(zoomConfig)
    this.$gantt().ext.zoom.setLevel('hour')
    this.$gantt().init(this.$refs.gantt)
  },
  beforeDestroy () {
    this.$gantt().clearAll()
  }

}
</script>

<style>
 @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

 .gantt, .gantElement{
   min-height: inherit;
 }

 .gantt_task_content{
   font-weight: bold;
 }
</style>
