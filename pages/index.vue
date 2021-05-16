<template>
  <div style="min-height: inherit">
    <div class="newPlotContainer py-3">
      <b-button v-if="!newPlot" variant="primary" @click="newPlot=!newPlot">
        New plot
      </b-button>

      <div v-if="newPlot">
        <b-form-file
          v-model="file"
          placeholder="Choose a plot log file or drop it here..."
          drop-placeholder="Drop plot log file here..."
        />

        <b-button class="mt-2" variant="primary" :disabled="!file" @click="send">
          Create
        </b-button>
        <b-button v-if="newPlot" class="mt-2" @click="newPlot=false">
          Cancel
        </b-button>
      </div>
    </div>
    <Gantt class="left-container" :tasks="tasks" />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      file: undefined,
      newPlot: false,
      plots: [],
      tasks: {
        data: []
      }
    }
  },
  methods: {
    addPlotTasks (plot) {
      const taskId = this.$gantt().addTask({
        text: plot.id,
        start_date: new Date(plot.phaseOne.startDate),
        end_date: new Date(plot.copyPhase.endDate),
        totalTime: plot.totalTime,
        progress: 1,
        holder: 'hi',
        size: `k${plot.plotSize}`,
        threads: plot.threads,
        ram: plot.ram,
        open: false,
        render: 'split'
      })
      this.$gantt().addTask({
        text: 'PHASE 1',
        start_date: new Date(plot.phaseOne.startDate),
        totalTime: plot.phaseOne.duration,
        end_date: new Date(plot.phaseOne.endDate),
        progress: 1,
        open: false,
        color: '#08534a',
        parent: taskId
      })
      this.$gantt().addTask({
        text: 'PHASE 2',
        start_date: new Date(plot.phaseTwo.startDate),
        totalTime: plot.phaseTwo.duration,
        end_date: new Date(plot.phaseTwo.endDate),
        progress: 1,
        color: '#ff9f01',
        parent: taskId,
        open: false
      })
      this.$gantt().addTask({

        text: 'PHASE 3',
        start_date: new Date(plot.phaseThree.startDate),
        totalTime: plot.phaseThree.duration,
        end_date: new Date(plot.phaseThree.endDate),
        progress: 1,
        color: '#3e612c',
        parent: taskId,
        open: false
      })
      this.$gantt().addTask({
        text: 'PHASE 4',
        start_date: new Date(plot.phaseFour.startDate),
        totalTime: plot.phaseFour.duration,
        end_date: new Date(plot.phaseFour.endDate),
        progress: 1,
        color: '#3f3d56',
        parent: taskId,
        open: false
      })
      this.$gantt().addTask({
        text: 'COPY',
        start_date: new Date(plot.copyPhase.startDate),
        totalTime: plot.copyPhase.duration,
        end_date: new Date(plot.copyPhase.endDate),
        progress: 1,
        color: '#3563b1',
        parent: taskId,
        open: false
      })
      /* Get earliest date and latest date */
      const earliestOrderedList = this.plots.sort((a, b) => new Date(a.phaseOne.startDate) - new Date(b.phaseOne.startDate))
      const minDate = earliestOrderedList[0].phaseOne.startDate
      this.$gantt().config.start_date = dayjs(minDate).startOf('hour').toDate()
      const latestOrderedList = this.plots.sort((a, b) => new Date(b.copyPhase.endDate) - new Date(a.copyPhase.endDate))
      const maxDate = latestOrderedList[0].copyPhase.endDate
      this.$gantt().config.end_date = dayjs(maxDate).endOf('hour').toDate()
    },
    send () {
      // this.$gantt().parse(this.tasks)
      const reader = new FileReader()

      reader.onload = () => {
        // console.log(reader.result)
        const plot = {
          phaseOne: {
            startDate: reader.result.split('Starting phase 1/4: Forward Propagation into tmp files... ')[1].split('\n')[0],
            endDate: reader.result.split('Time for phase 1 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
            duration: reader.result.split('Time for phase 1 = ')[1].split('\n')[0].split(' ')[0]
          },
          phaseTwo: {
            startDate: reader.result.split('Starting phase 2/4: Backpropagation into tmp files... ')[1].split('\n')[0],
            endDate: reader.result.split('Time for phase 2 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
            duration: reader.result.split('Time for phase 2 = ')[1].split('\n')[0].split(' ')[0]
          },
          phaseThree: {
            startDate: reader.result.split('Starting phase 3/4: ')[1].split('\n')[0].split('... ')[1],
            endDate: reader.result.split('Time for phase 3 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
            duration: reader.result.split('Time for phase 3 = ')[1].split('\n')[0].split(' ')[0]
          },
          phaseFour: {
            startDate: reader.result.split('Starting phase 4/4: ')[1].split('\n')[0].split('... ')[1],
            endDate: reader.result.split('Time for phase 4 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
            duration: reader.result.split('Time for phase 4 = ')[1].split('\n')[0].split(' ')[0]
          },
          copyPhase: {
            startDate: reader.result.split('Time for phase 4 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
            endDate: reader.result.split('Copy time = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
            duration: reader.result.split('Copy time = ')[1].split('\n')[0].split(' ')[0]
          },
          totalTime: reader.result.split('Total time = ')[1].split('\n')[0].split(' ')[0],
          plotSize: reader.result.split('Plot size is: ')[1].split('\n')[0],
          ram: reader.result.split('Buffer size is: ')[1].split('\n')[0],
          buckets: reader.result.split('Buffer size is: ')[1].split('\n')[1].split(' ')[1],
          threads: reader.result.split('Buffer size is: ')[1].split('\n')[2].split(' ')[1],
          id: reader.result.split('ID: ')[1].split('\n')[0]
        }
        console.log(plot)
        this.plots.push(plot)
        this.addPlotTasks(plot)
      }
      reader.readAsText(this.file)
      this.newPlot = false
    }
  }
}
</script>

<style>
  .newPlotContainer{
    text-align: left;
    padding: 0 16px;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
</style>
