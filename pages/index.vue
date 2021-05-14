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
      //https://docs.dhtmlx.com/gantt/api__gantt_refreshdata.html
      console.log('hi')
      this.$gantt().refreshData()
      this.$gantt().refreshTask(2)
      this.$gantt().render()
    },
    send () {
      this.$gantt().parse(this.tasks)
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
