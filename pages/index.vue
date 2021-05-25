<template>
  <div style="min-height: inherit">
    <div class="newPlotContainer py-3">
      <div v-if="loadingShared">
        <b-spinner class="loaderShare" type="grow" label="Spinning" />
      </div>
      <div v-else>
        <div class="d-flex justify-content-between">
          <b-button v-if="!newPlot" variant="primary" @click="newPlot=!newPlot">
            {{ $t('ganttPage.createPlot') }}
          </b-button>
          <b-button v-if="plots.length && !shareUrl && !newPlot" variant="primary" class="float-right" @click="share">
            <b-spinner v-show="sharingUrl" class="spinnerShare" small />
            {{ $t('ganttPage.share') }}
          </b-button>
          <b-input-group v-if="shareUrl && !newPlot" style="width: 285px;">
            <b-form-input ref="inputCopyShare" class="copyInput" :value="shareUrl" readonly />
            <b-input-group-append>
              <b-button variant="info" @click="copyShareUrl">
                Copy!
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>

      <div v-if="newPlot">
        <b-form-file
          v-model="files"
          multiple
          :placeholder="$t('ganttPage.plotFileSelect.placeholder')"
          :drop-placeholder="$t('ganttPage.plotFileSelect.placeholder')"
        />
        <b-tooltip placement="bottom-right" target="tooltip-target-1" triggers="hover" variant="dark">
          <div>
            <small><b>Windows:</b> C:\Users\{your_user_name}\.chia\mainnet\plotter</small>
          </div>
          <div>
            <small><b>Linux:</b> /home/{your_user_name}/.chia/mainnet/plotter</small>
          </div>
        </b-tooltip>
        <div>
          <b-button id="tooltip-target-1" class="mt-2 text-decoration-none pl-0" variant="link" :active="true">
            {{ $t('ganttPage.tooltipLog') }}
          </b-button>
        </div>

        <b-button class="mt-2" variant="primary" :disabled="!files.length" @click="send">
          {{ $t('general.create') }}
        </b-button>
        <b-button v-if="newPlot" class="mt-2" @click="newPlot=false">
          {{ $t('general.cancel') }}
        </b-button>
      </div>
    </div>
    <Gantt class="left-container" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { DiskColors } from '@/utils/constants/colors'
export default {
  data () {
    return {
      files: [],
      newPlot: false,
      plots: [],
      shareUrl: undefined,
      sharingUrl: false,
      loadingShared: false
    }
  },
  head () {
    return {
      title: this.$t('ganttPage.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('ganttPage.meta.description')
        }
      ]
    }
  },
  created () {
    if (this.$route.query.data) {
      this.loadingShared = true
    }
  },
  mounted () {
    this.loadFromUrl()
  },
  methods: {
    copyShareUrl () {
      this.$refs.inputCopyShare.select()
      this.$refs.inputCopyShare.setSelectionRange(0, 99999)
      document.execCommand('copy')
    },
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
    async share () {
      this.sharingUrl = true
      const objJsonStr = JSON.stringify(this.plots)
      const objJsonB64 = Buffer.from(objJsonStr).toString('base64')

      const blockParts = objJsonB64.match(new RegExp('.{1,' + 10000 + '}', 'g'))
      try {
        const apiCalls = blockParts.map((part) => {
          return this.$axios.$get(`https://tinyurl.com/api-create.php?url=www.chiaplotsimulator.com/?data=${part}`)
        })
        const results = await Promise.all(apiCalls)
        const shareParamUrl = results.map(result => result.split('.com/')[1]).join('-')

        this.shareUrl = `${process.env.baseUrl}/?data=${shareParamUrl}`
        this.sharingUrl = false
      } catch (e) {
        console.log('error creating url to share', e)
      }
    },
    async loadFromUrl () {
      if (this.$route.query.data) {
        let resultsApi
        const urlBlocks = this.$route.query.data.split('-')
        try {
          const apiCalls = urlBlocks.map((urlBlock) => {
            return this.$axios.$post(`/api/expandurl/?url=https://tinyurl.com/${urlBlock}`)
          })
          resultsApi = await Promise.all(apiCalls)
        } catch (e) {
          console.log('loading from expand', JSON.stringify(e))
        }
        const b64 = resultsApi.map(result => result.split('?data=')[1]).join()
        const objJsonStr = Buffer.from(b64, 'base64').toString('ascii')
        const logsToProcess = JSON.parse(objJsonStr)
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
        this.createDisks()
        this.$gantt().render()
        this.loadingShared = false
      }
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
              startDate: log.split('Starting phase 2/4: ')[1].split('\n')[0].split('... ')[1],
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
            diskTemp1Name: log.split('Starting plotting progress into temporary dirs: ')[1].split('\n')[0].split(' ')[0],
            diskTemp2Name: log.split('Starting plotting progress into temporary dirs: ')[1].split('\n')[0].split(' ')[2],
            diskFinal: log.split('Copied final file from ')[1].split('\n')[0].split(' ')[2].split('plot-')[0],
            totalTime: log.split('Total time = ')[1].split('\n')[0].split(' ')[0],
            copyTime: log.split('Copy time = ')[1].split('\n')[0].split(' ')[0],
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
        copyTime: plot.copyTime,
        progress: 1,
        size: `k${plot.plotSize}`,
        threads: plot.threads,
        buckets: plot.buckets,
        ram: plot.ram,
        diskTemp1Name: plot.diskTemp1Name,
        diskTemp2Name: plot.diskTemp2Name,
        diskFinal: plot.diskFinal,
        open: false,
        render: 'split'
      })
      this.$gantt().addTask({
        text: this.$t('ganttPage.plot.phase1'),
        start_date: new Date(plot.phaseOne.startDate),
        totalTime: plot.phaseOne.duration,
        end_date: new Date(plot.phaseOne.endDate),
        progress: 1,
        open: false,
        color: '#08534a',
        parent: taskId
      })
      this.$gantt().addTask({
        text: this.$t('ganttPage.plot.phase2'),
        start_date: new Date(plot.phaseTwo.startDate),
        totalTime: plot.phaseTwo.duration,
        end_date: new Date(plot.phaseTwo.endDate),
        progress: 1,
        color: '#ff9f01',
        parent: taskId,
        open: false
      })
      this.$gantt().addTask({

        text: this.$t('ganttPage.plot.phase3'),
        start_date: new Date(plot.phaseThree.startDate),
        totalTime: plot.phaseThree.duration,
        end_date: new Date(plot.phaseThree.endDate),
        progress: 1,
        color: '#3e612c',
        parent: taskId,
        open: false
      })
      this.$gantt().addTask({
        text: this.$t('ganttPage.plot.phase4'),
        start_date: new Date(plot.phaseFour.startDate),
        totalTime: plot.phaseFour.duration,
        end_date: new Date(plot.phaseFour.endDate),
        progress: 1,
        color: '#3f3d56',
        parent: taskId,
        open: false
      })
      this.$gantt().addTask({
        text: this.$t('ganttPage.plot.phaseCopy'),
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
        this.processPlotLogs(values)
        this.createDisks()
        this.newPlot = false
      })
    },

    createDisks () {
      const diskTemp1NameDic = {}
      const diskFinalNameDic = {}
      let nextDiskTemp1Color = 0
      let nextFinalDiskColor = DiskColors.length - 1
      for (const plot of this.plots) {
        if (!(plot.diskTemp1Name in diskTemp1NameDic)) {
          diskTemp1NameDic[plot.diskTemp1Name] = DiskColors[nextDiskTemp1Color] || 'no-colors'
          nextDiskTemp1Color++
        }
        if (!(plot.diskFinal in diskFinalNameDic)) {
          diskFinalNameDic[plot.diskFinal] = DiskColors[nextFinalDiskColor] || 'no-colors'
          nextFinalDiskColor--
        }
      }

      this.$gantt().templates.grid_row_class = function (start, end, task) {
        if (task.diskTemp1Name in diskTemp1NameDic && task.diskFinal in diskFinalNameDic) {
          return `disk-color-${diskTemp1NameDic[task.diskTemp1Name]} disk-final-color-${diskFinalNameDic[task.diskFinal]}`
        }
        return ''
      }
      this.$gantt().templates.tooltip_text = (start, end, task) => {
        const isParent = !task.parent
        const totalPlotTime = task.totalTime ? Number(task.totalTime) * 1000 : 0;
        const duration = totalPlotTime ? new Date(totalPlotTime).toISOString().substr(11, 8) : ''
        if (isParent) {
          const totalCopyTime = task.copyTime ? Number(task.copyTime) * 1000 : 0;
          const totalTime = totalPlotTime + totalCopyTime;
          const durationCopy = totalCopyTime ? new Date(totalCopyTime).toISOString().substr(11, 8) : ''
          const durationTotal = totalTime ? new Date(totalTime).toISOString().substr(11, 8) : ''
          return `<b>Plot ID:</b> ${task.id}
              <br/><b>${this.$t('ganttPage.fields.duration')}:</b> ${duration}
              <br/><b>${this.$t('ganttPage.fields.durationCopy')}:</b> ${durationCopy}
              <br/><b>${this.$t('ganttPage.fields.durationTotal')}:</b> ${durationTotal}
              <br/><b>${this.$t('ganttPage.fields.startDate')}:</b> ${start.toLocaleString()}
              <br/><b>${this.$t('ganttPage.fields.endDate')}:</b> ${end.toLocaleString()}
              <br/><b>${this.$t('ganttPage.fields.size')}:</b> ${task.size}
              <br/><b>${this.$t('ganttPage.fields.buckets')}:</b> ${task.buckets}
              <br/><b>${this.$t('ganttPage.fields.diskTemp1Name')}:</b> ${task.diskTemp1Name} ${(task.diskTemp1Name in diskTemp1NameDic) ? `<div class="tooltip-disk-color-${diskTemp1NameDic[task.diskTemp1Name]}"></div>` : null} 
              <br/><b>${this.$t('ganttPage.fields.diskTemp2Name')}:</b> ${task.diskTemp2Name} 
              <br/><b>${this.$t('ganttPage.fields.diskFinal')}:</b> ${task.diskFinal} ${(task.diskFinal in diskFinalNameDic) ? `<div class="tooltip-disk-final-color-${diskFinalNameDic[task.diskFinal]}"></div>` : null}
              `
        } else {
          return `<b>${this.$t('ganttPage.fields.phase')}:</b> ${task.text}
              <br/><b>${this.$t('ganttPage.fields.duration')}:</b> ${duration}
              <br/><b>${this.$t('ganttPage.fields.startDate')}:</b> ${start.toLocaleString()}
              <br/><b>${this.$t('ganttPage.fields.endDate')}</b> ${end.toLocaleString()}`
        }
      }
    }

  }
}
</script>

<style>
  .loaderShare{
    position: absolute;
    z-index: 999999;
    top: 50%;
    left: 50%;
  }
  .newPlotContainer{
    text-align: left;
    padding: 0 16px;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .copyInput{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .spinnerShare{
    margin-bottom: 1px;
    margin-right: 3px;
  }

</style>
