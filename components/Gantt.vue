<template>
  <div ref="gantt" class="gantElement" />
</template>

<script>
import dayjs from 'dayjs'

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
      { name: 'start_date', label: this.$t('ganttPage.fields.startDate'), align: 'center', width: 150 },
      {
        name: 'duration',
        label: this.$t('ganttPage.fields.duration'),
        align: 'center',
        template (obj) {
          return (obj.totalTime) ? new Date(Number(obj.totalTime) * 1000).toISOString().substr(11, 8) : ''
        }
      },
      { name: 'threads', label: this.$t('ganttPage.fields.threads'), align: 'center', width: 50, resize: true, hide: true },
      { name: 'ram', label: this.$t('ganttPage.fields.ram'), align: 'center' },
      { name: 'size', label: this.$t('ganttPage.fields.size'), align: 'center', width: 50 },
      { name: 'buckets', label: this.$t('ganttPage.fields.buckets'), align: 'center', width: 50 },
      { name: 'diskTemp1Name', label: this.$t('ganttPage.fields.buckets'), align: 'center', width: 90 }
      // { name: 'add', label: '', width: 44 }
    ]

    this.$gantt().plugins({
      tooltip: true
    })
    this.$gantt().templates.tooltip_text = (start, end, task) => {
      const isParent = !task.parent
      const name = isParent ? task.id : task.text
      const duration = task.totalTime ? new Date(Number(task.totalTime) * 1000).toISOString().substr(11, 8) : ''

      return `<b>${isParent ? 'Plot ID' : this.$t('ganttPage.fields.phase')}:</b> ${name}
              <br/><b>${this.$t('ganttPage.fields.duration')}:</b> ${duration}
              <br/><b>${this.$t('ganttPage.fields.startDate')}:</b> ${start.toLocaleString()}
              <br/><b>${this.$t('ganttPage.fields.endDate')}</b> ${end.toLocaleString()}`
    }
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
    this.$gantt().config.order_branch = true
    this.$gantt().ext.zoom.init(zoomConfig)
    this.$gantt().ext.zoom.setLevel('hour')
    this.$gantt().init(this.$refs.gantt)
    // this.$gantt().parse(this.$props.tasks)
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
