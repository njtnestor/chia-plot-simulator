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
    this.$gantt().config.round_dnd_dates = false
    this.$gantt().config.time_step = 1
    this.$gantt().config.columns[1].width = 150
    this.$gantt().config.duration_unit = 'minute'
    this.$gantt().config.date_grid = '%Y-%m-%d %Hh:%i'

    this.$gantt().config.scales = [
      { unit: 'hour', step: 1, format: '%Hh' },
      { unit: 'day', step: 1, format: '%j, %D' }

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

 .gantt, .gantElement{
   min-height: inherit;
 }
</style>
