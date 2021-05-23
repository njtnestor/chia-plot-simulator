/* eslint-disable prefer-regex-literals */
export default class LogParserService {
  /* static plotSizeRg = new RegExp('^Plot size is: (\\d+)', 'i');
  static bufferSizeRg = new RegExp('^Buffer size is: (\\d+)MiB', 'i');
  static bucketsRg = new RegExp('^Using (\\d+) buckets', 'i');
  static threadsRg = new RegExp('^Using (\\d+) threads of stripe size (\\d+)', 'i');
  static startDateRg = new RegExp('^Starting phase 1/4: Forward Propagation into tmp files\\.\\.\\. (.+)', 'i');
  static phase1Rg = new RegExp('^Time for phase 1 = (\\d+)\\.\\d+ seconds', 'i');
  static phase2Rg = new RegExp('^Time for phase 2 = (\\d+)\\.\\d+ seconds', 'i');
  static phase3Rg = new RegExp('^Time for phase 3 = (\\d+)\\.\\d+ seconds', 'i');
  static phase4Rg = new RegExp('^Time for phase 4 = (\\d+)\\.\\d+ seconds', 'i');
  static copyTime = new RegExp('^Copy time = (\\d+)\\.\\d+ seconds', 'i');
  static totalTimeRg = new RegExp('^Total time = (\\d+)\\.\\d+ seconds', 'i');
  static plotNameRg = new RegExp('^Renamed final file from ".+" to (".+")', 'i');
  static currentBucketRg = new RegExp('^\\tBucket (\\d+)', 'i');
  static phase1Table = new RegExp('^Computing table (\\d+)', 'i');
  static phase2Table = new RegExp('^Backpropagating on table (\\d+)', 'i');
  static phase3Table = new RegExp('^Compressing tables (\\d+)', 'i');
  static tmpFolders = new RegExp('^Starting plotting progress into temporary dirs: (.*) and (.*)', 'i');
  static writePloblemRg = new RegExp('^Only wrote \\d+ of \\d+ bytes at', 'i');
  static couldNotOpenFile = new RegExp('^Could not open', 'i');
  static readPloblemRg = new RegExp('^Only read \\d+ of \\d+ bytes at', 'i');
  static copyPloblemRg = new RegExp('^Could not copy ', 'i');
  static approximateWorkingSpace = new RegExp('^Approximate working space used \\(without final file\\): (\\d+\\.\\d+ .*)', 'i');
  static finalFileSize = new RegExp('^Final File size: (\\d+\\.\\d+ .*)', 'i');
  static destinationDirectory = new RegExp('^Final Directory is: (.*)', 'i'); */

  static matches = [
    new RegExp('^Plot size is: (\\d+)', 'i'),
    new RegExp('^Buffer size is: (\\d+)MiB', 'i'),
    new RegExp('^Using (\\d+) buckets', 'i'),
    new RegExp('^Using (\\d+) threads of stripe size (\\d+)', 'i'),
    new RegExp('^Starting phase 1/4: Forward Propagation into tmp files\\.\\.\\. (.+)', 'i'),
    new RegExp('^Time for phase 1 = (\\d+)\\.\\d+ seconds', 'i'),
    new RegExp('^Time for phase 2 = (\\d+)\\.\\d+ seconds', 'i'),
    new RegExp('^Time for phase 3 = (\\d+)\\.\\d+ seconds', 'i'),
    new RegExp('^Time for phase 4 = (\\d+)\\.\\d+ seconds', 'i'),
    new RegExp('^Copy time = (\\d+)\\.\\d+ seconds', 'i'),
    new RegExp('^Total time = (\\d+)\\.\\d+ seconds', 'i'),
    new RegExp('^Renamed final file from ".+" to (".+")', 'i'),
    new RegExp('^\\tBucket (\\d+)', 'i'),
    new RegExp('^Computing table (\\d+)', 'i'),
    new RegExp('^Backpropagating on table (\\d+)', 'i'),
    new RegExp('^Compressing tables (\\d+)', 'i'),
    new RegExp('^Starting plotting progress into temporary dirs: (.*) and (.*)', 'i'),
    new RegExp('^Only wrote \\d+ of \\d+ bytes at', 'i'),
    new RegExp('^Could not open', 'i'),
    new RegExp('^Only read \\d+ of \\d+ bytes at', 'i'),
    new RegExp('^Could not copy ', 'i'),
    new RegExp('^Approximate working space used \\(without final file\\): (\\d+\\.\\d+ .*)', 'i'),
    new RegExp('^Final File size: (\\d+\\.\\d+ .*)', 'i'),
    new RegExp('^Final Directory is: (.*)', 'i')
  ]

  static processLogFile (logFile) {
    const plot = {}
    const logFileLines = logFile.split('\n')
    logFileLines.forEach((line) => {
      console.log(line)
      const ind = LogParserService.matches.findIndex((reg) => line.match(reg))
      console.log(ind)
    })
    return plot
  }
}
