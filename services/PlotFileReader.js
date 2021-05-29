import Plot from './Plot'

export default class PlotFileReader {
  static processLogFile (log) {
    const isFinished = !!log.split('Renamed final file from')[1]
    const id = log.split('ID: ')[1]
    const bufferSize = log.split('Buffer size is: ')[1]
    const plotSize = log.split('Plot size is: ')[1]
    const diskFinal = log.split('Copied final file from ')[1]
    const tempDisks = log.split('Starting plotting progress into temporary dirs: ')[1]
    const phases = [
      {
        startDate: log.split('Starting phase 1/4: Forward Propagation into tmp files... ')[1],
        endDate: log.split('Time for phase 1 = ')[1],
        getStartDate (partialLog) { return this.startDate ? this.startDate.split('\n')[0] : '' },
        getEndDate (partialLog) { return this.endDate ? this.endDate.split('\n')[0].split(' ').slice(4).join(' ') : '' },
        getDuration (partialLog) { return this.endDate ? Number(this.endDate.split('\n')[0].split(' ')[0]) : 0 }
      },
      {
        startDate: log.split('Starting phase 2/4: ')[1],
        endDate: log.split('Time for phase 2 = ')[1],
        getStartDate (partialLog) { return this.startDate ? this.startDate.split('\n')[0].split('... ')[1] : '' },
        getEndDate (partialLog) { return this.endDate ? this.endDate.split('\n')[0].split(' ').slice(4).join(' ') : '' },
        getDuration (partialLog) { return this.endDate ? Number(this.endDate.split('\n')[0].split(' ')[0]) : 0 }
      },
      {
        startDate: log.split('Starting phase 3/4: ')[1],
        endDate: log.split('Time for phase 3 = ')[1],
        getStartDate (partialLog) { return this.startDate ? this.startDate.split('\n')[0].split('... ')[1] : '' },
        getEndDate (partialLog) { return this.endDate ? this.endDate.split('\n')[0].split(' ').slice(4).join(' ') : '' },
        getDuration (partialLog) { return this.endDate ? Number(this.endDate.split('\n')[0].split(' ')[0]) : 0 }
      },
      {
        startDate: log.split('Starting phase 4/4: ')[1],
        endDate: log.split('Time for phase 4 = ')[1],
        getStartDate (partialLog) { return this.startDate ? this.startDate.split('\n')[0].split('... ')[1] : '' },
        getEndDate (partialLog) { return this.endDate ? this.endDate.split('\n')[0].split(' ').slice(4).join(' ') : '' },
        getDuration (partialLog) { return this.endDate ? Number(this.endDate.split('\n')[0].split(' ')[0]) : 0 }
      },
      {
        startDate: log.split('Time for phase 4 = ')[1],
        endDate: log.split('Copy time = ')[1],
        getStartDate (partialLog) { return this.startDate ? this.startDate.split('\n')[0].split(' ').slice(4).join(' ') : '' },
        getEndDate (partialLog) { return this.endDate ? this.endDate.split('\n')[0].split(' ').slice(4).join(' ') : '' },
        getDuration (partialLog) { return this.endDate ? Number(this.endDate.split('\n')[0].split(' ')[0]) : 0 }
      }
    ]

    return new Plot({
      isFinished,
      phases: phases
        .map(phase => ({
          startDate: phase.getStartDate(),
          endDate: phase.getEndDate(),
          duration: phase.getDuration()
        }))
        .filter(phase => !!phase.duration),
      id: id.split('\n')[0],
      diskTemp1Name: tempDisks.split('\n')[0].split(' ')[0],
      diskTemp2Name: tempDisks.split('\n')[0].split(' ')[2],
      size: plotSize.split('\n')[0],
      ram: bufferSize.split('\n')[0],
      buckets: bufferSize.split('\n')[1].split(' ')[1],
      threads: bufferSize.split('\n')[2].split(' ')[1],
      diskFinal: diskFinal ? diskFinal.split('\n')[0].split(' ')[2].split('plot-')[0] : ''
    })
  }
}
