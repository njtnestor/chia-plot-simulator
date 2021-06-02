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
          <b-button v-if="!newPlot" variant="outline-primary" @click="show()">
            {{ $t('ganttPage.infoModal.title') }}
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
    <CustomModal modal-name="shareModal">
      <template slot="ModalContent">
        <ControlsGanttModal />
      </template>
    </CustomModal>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import CustomModal from '@/components/modal/CustomModal'
import ControlsGanttModal from '@/components/modal/ControlsGanttModal'
import PlotFileReader from '@/services/PlotFileReader'
import { DiskColors, PhaseColors } from '@/utils/constants/colors'

export default {
  name: 'Home',
  components: {
    CustomModal,
    ControlsGanttModal
  },
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
    show () {
      this.$modal.show('shareModal')
    },
    hide () {
      this.$modal.hide('shareModal')
    },
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
          .sort((a, b) => new Date(a.parent.startDate) - new Date(b.parent.startDate))
          .forEach((plot) => {
            this.plots.push(plot)
            this.addPlotTasks(plot)
          })

        this.adjustGanntRange()
        this.createDisks()
        this.$gantt().render()
        this.loadingShared = false
      }
    },
    adjustGanntRange () {
      /* Get earliest date and latest date */
      const earliestOrderedList = this.plots.sort((a, b) => new Date(a.parent.startDate) - new Date(b.parent.startDate))
      const minDate = earliestOrderedList[0].parent.startDate
      this.$gantt().config.start_date = dayjs(minDate).startOf('hour').toDate()
      const latestOrderedList = this.plots.sort((a, b) => new Date(b.parent.endDate) - new Date(a.parent.endDate))
      const maxDate = latestOrderedList[0].parent.endDate
      this.$gantt().config.end_date = dayjs(maxDate).endOf('hour').toDate()
    },
    processPlotLogs (logs) {
      logs.map(log => PlotFileReader.processLogFile(log).toJSON())
        .filter(plot => !!plot)
        .sort((a, b) => new Date(a.parent.startDate) - new Date(b.parent.startDate))
        .forEach((plot) => {
          this.plots.push(plot)
          this.addPlotTasks(plot)
        })
    },
    addPlotTasks (plot) {
      const taskId = this.$gantt().addTask({
        text: plot.parent.id,
        start_date: new Date(plot.parent.startDate),
        end_date: new Date(plot.parent.endDate),
        totalTime: plot.parent.totalTime,
        totalTimeWithoutCopy: plot.parent.totalTimeWithoutCopy,
        copyTime: plot.parent.copyTime,
        progress: 1,
        size: `k${plot.parent.size}`,
        threads: plot.parent.threads,
        buckets: plot.parent.buckets,
        ram: plot.parent.ram,
        diskTemp1Name: plot.parent.diskTemp1Name,
        diskTemp2Name: plot.parent.diskTemp2Name,
        diskFinal: plot.parent.diskFinal,
        open: false,
        render: 'split'
      })

      plot.phases.forEach((phase, index) => {
        this.$gantt().addTask({
          text: this.$t(`ganttPage.plot.phase${index + 1}`),
          start_date: new Date(phase.startDate),
          totalTime: phase.duration,
          end_date: new Date(phase.endDate),
          progress: 1,
          open: false,
          color: PhaseColors[index],
          parent: taskId
        })
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
        this.adjustGanntRange()
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
        if (!(plot.parent.diskTemp1Name in diskTemp1NameDic)) {
          diskTemp1NameDic[plot.parent.diskTemp1Name] = DiskColors[nextDiskTemp1Color] || 'no-colors'
          nextDiskTemp1Color++
        }
        if (plot.parent.diskFinal && !(plot.parent.diskFinal in diskFinalNameDic)) {
          diskFinalNameDic[plot.parent.diskFinal] = DiskColors[nextFinalDiskColor] || 'no-colors'
          nextFinalDiskColor--
        }
      }

      this.$gantt().templates.grid_row_class = function (start, end, task) {
        if (task.diskTemp1Name in diskTemp1NameDic || task.diskFinal in diskFinalNameDic) {
          const tempDiskClass = task.diskTemp1Name && diskTemp1NameDic[task.diskTemp1Name] ? `disk-color-${diskTemp1NameDic[task.diskTemp1Name]}` : ''
          const finalDiskClass = task.diskFinal && diskFinalNameDic[task.diskFinal] ? `disk-final-color-${diskFinalNameDic[task.diskFinal]}` : ''

          return `${tempDiskClass} ${finalDiskClass}`
        }
        return ''
      }
      this.$gantt().templates.tooltip_text = (start, end, task) => {
        const isParent = !task.parent
        const totalPlotTime = task.totalTime ? Number(task.totalTime) * 1000 : 0
        const totalCopyTime = task.copyTime ? Number(task.copyTime) * 1000 : 0
        const totalTime = totalPlotTime + totalCopyTime
        const duration = totalTime ? new Date(totalTime).toISOString().substr(11, 8) : ''
        const durationCopy = totalCopyTime ? new Date(totalCopyTime).toISOString().substr(11, 8) : ''
        if (isParent) {
          const durationCopyInfo = `<br/><b>${this.$t('ganttPage.fields.durationCopy')}:</b> ${durationCopy}`
          const finalDiskInfo = `<br/><b>${this.$t('ganttPage.fields.diskFinal')}:</b> ${task.diskFinal} ${(task.diskFinal in diskFinalNameDic) ? `<div class="tooltip-disk-final-color-${diskFinalNameDic[task.diskFinal]}"></div>` : null}`
          return `<b>Plot ID:</b> ${task.id}
              <br/><b>${this.$t('ganttPage.fields.startDate')}:</b> ${start.toLocaleString()}
              ${durationCopy ? durationCopyInfo : ''}
              <br/><b>${this.$t('ganttPage.fields.endDate')}:</b> ${end.toLocaleString()}
              <br/><b>${this.$t('ganttPage.fields.size')}:</b> ${task.size}
              <br/><b>${this.$t('ganttPage.fields.buckets')}:</b> ${task.buckets}
              <br/><b>${this.$t('ganttPage.fields.diskTemp1Name')}:</b> ${task.diskTemp1Name} ${(task.diskTemp1Name in diskTemp1NameDic) ? `<div class="tooltip-disk-color-${diskTemp1NameDic[task.diskTemp1Name]}"></div>` : null} 
              <br/><b>${this.$t('ganttPage.fields.diskTemp2Name')}:</b> ${task.diskTemp2Name} 
              ${task.diskFinal ? finalDiskInfo : ''}
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
