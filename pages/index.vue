<template>
  <div style="min-height: inherit">
    <div class="newPlotContainer py-3">
      <b-button v-if="!newPlot" variant="primary" @click="newPlot=!newPlot">
        New plot
      </b-button>

      <div v-if="newPlot">
        <b-form-file
          v-model="files"
          multiple
          placeholder="Choose a plot log file or drop it here..."
          drop-placeholder="Drop plot log file here..."
        />

        <b-button class="mt-2" variant="primary" :disabled="!files.length" @click="send">
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
import LogParserService from '../services/LogParserService'

export default {
  data () {
    return {
      files: [],
      newPlot: false,
      plots: [],
      tasks: {
        data: []
      }
    }
  },
  head () {
    return {
      title: 'Chia Plot Simulator - Analyze your plotting time',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This plotting simulator will help you to plot faster, find errors visually, analyze if it went as you had planned and earn more chias (XCH).'
        }
      ]
    }
  },
  methods: {
    readFile (file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => {
          resolve(fr.result)
        }
        fr.onerror = () => {
          reject(fr)
        }
        fr.readAsText(file)
      })
    },
    processPlotLogs (logs) {
      const logsToProcess = []
      logs.forEach((log) => {
        const isFinished = !!log.split('Copy time = ')[1]
        if (isFinished) {
          const plot = {
            phaseOne: {
              startDate: log.split('Starting phase 1/4: Forward Propagation into tmp files... ')[1].split('\n')[0],
              endDate: log.split('Time for phase 1 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
              duration: log.split('Time for phase 1 = ')[1].split('\n')[0].split(' ')[0]
            },
            phaseTwo: {
              startDate: log.split('Starting phase 2/4: Backpropagation into tmp files... ')[1].split('\n')[0],
              endDate: log.split('Time for phase 2 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
              duration: log.split('Time for phase 2 = ')[1].split('\n')[0].split(' ')[0]
            },
            phaseThree: {
              startDate: log.split('Starting phase 3/4: ')[1].split('\n')[0].split('... ')[1],
              endDate: log.split('Time for phase 3 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
              duration: log.split('Time for phase 3 = ')[1].split('\n')[0].split(' ')[0]
            },
            phaseFour: {
              startDate: log.split('Starting phase 4/4: ')[1].split('\n')[0].split('... ')[1],
              endDate: log.split('Time for phase 4 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
              duration: log.split('Time for phase 4 = ')[1].split('\n')[0].split(' ')[0]
            },
            copyPhase: {
              startDate: log.split('Time for phase 4 = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
              endDate: log.split('Copy time = ')[1].split('\n')[0].split(' ').slice(4).join(' '),
              duration: log.split('Copy time = ')[1].split('\n')[0].split(' ')[0]
            },
            totalTime: log.split('Total time = ')[1].split('\n')[0].split(' ')[0],
            plotSize: log.split('Plot size is: ')[1].split('\n')[0],
            ram: log.split('Buffer size is: ')[1].split('\n')[0],
            buckets: log.split('Buffer size is: ')[1].split('\n')[1].split(' ')[1],
            threads: log.split('Buffer size is: ')[1].split('\n')[2].split(' ')[1],
            id: log.split('ID: ')[1].split('\n')[0]
          }
          logsToProcess.push(plot)
        }
      })

      logsToProcess
        .sort((a, b) => new Date(a.phaseOne.startDate) - new Date(b.phaseOne.startDate))
        .forEach((plot) => {
          this.plots.push(plot)
          this.addPlotTasks(plot)
        })

      /* Get earliest date and latest date */
      const earliestOrderedList = this.plots.sort((a, b) => new Date(a.phaseOne.startDate) - new Date(b.phaseOne.startDate))
      const minDate = earliestOrderedList[0].phaseOne.startDate
      this.$gantt().config.start_date = dayjs(minDate).startOf('hour').toDate()
      const latestOrderedList = this.plots.sort((a, b) => new Date(b.copyPhase.endDate) - new Date(a.copyPhase.endDate))
      const maxDate = latestOrderedList[0].copyPhase.endDate
      this.$gantt().config.end_date = dayjs(maxDate).endOf('hour').toDate()
    },
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
    },
    send () {
      const readers = []

      // Store promises in array
      this.files.forEach((file) => {
        readers.push(this.readFile(file))
      })

      // Trigger Promises
      Promise.all(readers).then((values) => {
        // Values will be an array that contains an item
        // with the text of every selected file
        // ["File1 Content", "File2 Content" ... "FileN Content"]
        LogParserService.processLogFile(values[0])
        this.processPlotLogs(values)
        this.newPlot = false
      })
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
