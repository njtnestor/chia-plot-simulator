<template>
  <Gantt class="left-container" :tasks="tasks" />
</template>

<script>
export default {
  data () {
    return {
      tasks: {
        data: [
          {
            id: '1',
            text: 'Q1 - P1',
            start_date: '01-04-2025 14:10',
            end_date: '01-04-2025 21:54',
            progress: 1,
            open: false,
            render: 'split'
          },
          {
            id: '2',
            text: 'F1',
            start_date: '01-04-2025 14:10',
            end_date: '01-04-2025 16:37',
            progress: 1,
            open: false,
            color: 'pink',
            parent: 1
          },
          {
            id: '3',
            text: 'F2',
            start_date: '01-04-2025 16:37',
            end_date: '01-04-2025 18:34',
            progress: 1,
            color: '#35FFF0',
            parent: 1,
            open: false
          },
          {
            id: '4',
            text: 'F3',
            start_date: '01-04-2025 18:34',
            end_date: '01-04-2025 21:12',
            progress: 1,
            color: 'lime',
            parent: 1,
            open: false
          },
          {
            id: '5',
            text: 'F4',
            start_date: '01-04-2025 21:12',
            end_date: '01-04-2025 21:23',
            progress: 1,
            color: 'red',
            parent: 1,
            open: false
          },
          {
            id: '6',
            text: 'Copy',
            start_date: '01-04-2025 21:23',
            end_date: '01-04-2025 21:54',
            progress: 1,
            color: 'grey',
            parent: 1,
            open: false
          }
        ]

      }
    }
  }
}
</script>

<style>

 html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
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
