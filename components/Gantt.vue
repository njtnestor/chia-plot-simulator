<template>
  <div ref="gantt" class="gantt" />
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

  mounted () {
    this.$gantt().config.round_dnd_dates = false
    this.$gantt().config.time_step = 1
    this.$gantt().config.columns[1].width = 150
    this.$gantt().config.duration_unit = 'minute'
    this.$gantt().config.date_grid = '%Y-%m-%d %H:%i'

    this.$gantt().config.scales = [
      { unit: 'hour', step: 1, format: '%H' },
      { unit: 'minute', step: 30, format: '%i' }
    ]
    this.$gantt().init(this.$refs.gantt)
    this.$gantt().parse(this.$props.tasks)
    /* gantt.init(this.$refs.gantt)
    gantt.parse(this.$props.tasks) */
  }

}
</script>

<style>
 @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

 .gantt{
   min-height: inherit;
 }
</style>
