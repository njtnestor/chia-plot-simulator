<template>
  <div style="min-height: inherit">
    <b-container class="py-3">
      <b-button @click="newPlot=!newPlot">
        New plot
      </b-button>
      <b-button v-if="newPlot" @click="newPlot=false">
        X
      </b-button>
      <div v-if="newPlot">
        <b-form-input
          v-model="plotName"
          class="my-2"
          placeholder="Plot name"
        />
        <b-form-file
          v-model="file"
          placeholder="Choose a plot log file or drop it here..."
          drop-placeholder="Drop plot log file here..."
        />

        <div class="mt-3">
          Selected file: {{ file ? file.name : '' }}
        </div>

        <input v-model="tasks.data[1].start_date" @input="change">
        <b-button @click="send">
          click
        </b-button>
      </div>
    </b-container>
    <Gantt class="left-container" :tasks="tasks" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      plotName: undefined,
      file: undefined,
      newPlot: false,
      tasks: {
        data: [
          {
            id: '1',
            text: 'Q1 - P1',
            start_date: '01-04-2021 14:10',
            end_date: '01-04-2021 21:54',
            progress: 1,
            open: false,
            render: 'split'
          },
          {
            id: '2',
            text: 'F1',
            start_date: '01-04-2021 14:14',
            end_date: '01-04-2021 16:37',
            progress: 1,
            open: false,
            color: 'pink',
            parent: 1
          },
          {
            id: '3',
            text: 'F2',
            start_date: '01-04-2021 16:37',
            end_date: '01-04-2021 18:34',
            progress: 1,
            color: '#35FFF0',
            parent: 1,
            open: false
          },
          {
            id: '4',
            text: 'F3',
            start_date: '01-04-2021 18:34',
            end_date: '01-04-2021 21:12',
            progress: 1,
            color: 'lime',
            parent: 1,
            open: false
          },
          {
            id: '5',
            text: 'F4',
            start_date: '01-04-2021 21:12',
            end_date: '01-04-2021 21:23',
            progress: 1,
            color: 'red',
            parent: 1,
            open: false
          },
          {
            id: '6',
            text: 'Copy',
            start_date: '01-04-2021 21:23',
            end_date: '01-04-2021 21:54',
            progress: 1,
            color: 'grey',
            parent: 1,
            open: false
          },
          {
            id: '7',
            text: 'Q2 - P1',
            start_date: '01-04-2021 14:10',
            end_date: '01-04-2021 21:54',
            progress: 1,
            open: false,
            render: 'split'
          }
        ]

      }
    }
  },
  methods: {
    change () {
      // https://docs.dhtmlx.com/gantt/api__gantt_refreshdata.html
      console.log('hi')
      this.$gantt().refreshData()
      this.$gantt().refreshTask(2)
      this.$gantt().render()
    },
    send () {
      // this.$gantt().parse(this.tasks)
      const reader = new FileReader()

      reader.onload = function (evt) {
        // console.log(reader.result)
        const phase1Startinfo = reader.result.split('Starting phase 1/4: Forward Propagation into tmp files... ')[1].split('\n')[0].split(' ')
        console.log('-f1 start-date: ', phase1Startinfo[0], phase1Startinfo[1], phase1Startinfo[2], phase1Startinfo[3], phase1Startinfo[4])
        const phase1Endinfo = reader.result.split('Time for phase 1 = ')[1].split('\n')[0].split(' ')
        console.log('f1 end-duration: ', phase1Endinfo[0])
        console.log('f1 end-date: ', phase1Endinfo[4], phase1Endinfo[5], phase1Endinfo[6], phase1Endinfo[7], phase1Endinfo[8])

        const phase2Startinfo = reader.result.split('Starting phase 2/4: Backpropagation into tmp files... ')[1].split('\n')[0].split(' ')
        console.log('-f2 start-date: ', phase2Startinfo[0], phase2Startinfo[1], phase2Startinfo[2], phase2Startinfo[3], phase2Startinfo[4])
        const phase2Endinfo = reader.result.split('Time for phase 2 = ')[1].split('\n')[0].split(' ')
        console.log('f2 end-duration: ', phase2Endinfo[0])
        console.log('f2 end-date: ', phase2Endinfo[4], phase2Endinfo[5], phase2Endinfo[6], phase2Endinfo[7], phase2Endinfo[8])

        const phase3Startinfo = reader.result.split('Starting phase 3/4: ')[1].split('\n')[0].split('... ')[1].split(' ')
        console.log('-f3 start-date: ', phase3Startinfo[0], phase3Startinfo[1], phase3Startinfo[2], phase3Startinfo[3], phase3Startinfo[4])
        const phase3Endinfo = reader.result.split('Time for phase 3 = ')[1].split('\n')[0].split(' ')
        console.log('f3 end-duration: ', phase3Endinfo[0])
        console.log('f3 end-date: ', phase3Endinfo[4], phase3Endinfo[5], phase3Endinfo[6], phase3Endinfo[7], phase3Endinfo[8])

        const phase4Startinfo = reader.result.split('Starting phase 4/4: ')[1].split('\n')[0].split('... ')[1].split(' ')
        console.log('-f4 start-date: ', phase4Startinfo[0], phase4Startinfo[1], phase4Startinfo[2], phase4Startinfo[3], phase4Startinfo[4])
        const phase4Endinfo = reader.result.split('Time for phase 4 = ')[1].split('\n')[0].split(' ')
        console.log('f4 end-duration: ', phase4Endinfo[0])
        console.log('f4 end-date: ', phase4Endinfo[4], phase4Endinfo[5], phase4Endinfo[6], phase4Endinfo[7], phase4Endinfo[8])

        const totalTime = reader.result.split('Total time = ')[1].split('\n')[0].split(' ')[0]
        console.log('-Total time: ', totalTime)

        const phaseCopyInfo = reader.result.split('Copy time = ')[1].split('\n')[0].split(' ')
        console.log('-fCopy duration: ', phaseCopyInfo[0])
        console.log('fCopy end-date: ', phaseCopyInfo[4], phaseCopyInfo[5], phaseCopyInfo[6], phaseCopyInfo[7], phaseCopyInfo[8])
      }
      reader.readAsText(this.file)
    }
  }
}
</script>

<style>

  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
</style>
