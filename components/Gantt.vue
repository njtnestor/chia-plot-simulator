<template>
  <div ref="gantt" class="gantElement" />
</template>

<script>

export default {
  name: 'Gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return { data: [], links: [] }
      }
    }
  },
  data () {
    return {
      hi: false,
      file: undefined
    }
  },

  mounted () {
    this.$gantt().config.fit_tasks = true
    this.$gantt().config.round_dnd_dates = false
    this.$gantt().config.time_step = 1
    this.$gantt().config.min_column_width = 100
    this.$gantt().config.grid_width = 500
    this.$gantt().config.duration_unit = 'minute'
    this.$gantt().config.date_grid = '%Y-%m-%d %H:%i'

    this.$gantt().config.scales = [
      { unit: 'hour', step: 1, format: '%Hh' },
      { unit: 'day', step: 1, format: '%Y-%m-%d, %D' }

    ]
    this.$gantt().config.columns = [
      // { name: 'text', label: 'Task name', width: '*', tree: true },
      { name: 'start_date', label: 'Start time', align: 'center', width: 150 },
      {
        name: 'duration',
        label: 'Duration',
        align: 'center',
        template (obj) {
          return (obj.totalTime) ? new Date(Number(obj.totalTime) * 1000).toISOString().substr(11, 8) : ''
        }
      },
      { name: 'threads', label: 'Threads', align: 'center', width: 50 },
      { name: 'ram', label: 'Ram', align: 'center' },
      { name: 'size', label: 'Size', align: 'center', width: 50 },
      { name: 'add', label: '', width: 44 }
    ]

    this.$gantt().plugins({
      tooltip: true
    })
    this.$gantt().templates.tooltip_text = function (start, end, task) {
      return `<b>Phase:</b> ${task.text}
              <br/><b>Duration:</b> ${new Date(Number(task.totalTime) * 1000).toISOString().substr(11, 8)}
              <br/><b>Start date:</b> ${start.toLocaleString()}
              <br/><b>End date:</b> ${end.toLocaleString()}`
    }
    this.$gantt().init(this.$refs.gantt)
    this.$gantt().parse(this.$props.tasks)
    /* gantt.init(this.$refs.gantt)
    gantt.parse(this.$props.tasks) */
  }

}
</script>

<style>
 @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

 .gantt, .gantElement{
   min-height: inherit;
 }
</style>
