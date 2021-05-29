export default class Plot {
  constructor (logFileProcessed = {}) {
    this.logFileProcessed = logFileProcessed
  }

  get isFinished () {
    return this.logFileProcessed.isFinished
  }

  /* Minimal log size to be rendered */
  get hasMinimalRequirements () {
    return !!this.logFileProcessed.phases && !!this.logFileProcessed.phases[0] && !!this.logFileProcessed.phases[0].endDate
  }

  get getEndDate () {
    return [...this.logFileProcessed.phases].pop().endDate
  }

  get getTotalPhasesTime () {
    return this.logFileProcessed.phases.reduce((acc, cur) => acc + cur.duration, 0)
  }

  get getTotalTimeWithoutCopy () {
    return this.logFileProcessed.phases.slice(0, 4).reduce((acc, cur) => acc + cur.duration, 0)
  }

  get getCopyTime () {
    const copyPhase = this.logFileProcessed.phases[4]
    return copyPhase ? copyPhase.duration : 0
  }

  toJSON () {
    if (!this.hasMinimalRequirements) {
      return undefined
    }
    return {
      id: this.logFileProcessed.id,
      parent: {
        startDate: this.logFileProcessed.phases[0].startDate,
        endDate: this.getEndDate,
        totalTime: this.getTotalPhasesTime,
        totalTimeWithoutCopy: this.getTotalTimeWithoutCopy,
        size: this.logFileProcessed.size,
        threads: this.logFileProcessed.threads,
        buckets: this.logFileProcessed.buckets,
        ram: this.logFileProcessed.ram,
        diskTemp1Name: this.logFileProcessed.diskTemp1Name,
        diskTemp2Name: this.logFileProcessed.diskTemp2Name,

        copyTime: this.getCopyTime,
        diskFinal: this.logFileProcessed.diskFinal
      },
      phases: this.logFileProcessed.phases
    }
  }
}
