

export class Clock {
  constructor(data) {
    this.tz = data.tz // timezone
    this.timeFormat = data.timeFormat // 12hr vs 24hr
    this.timeStringFormat = data.timeStringFormat
    this.dateStringFormat = data.dateStringFormat
    this.clockType = data.clockType // analog vs digital
  }

  get digitalClockTemplate() {
    return `
    
    `
  }

  get analogClockTemplate() {
    return `
    
    `
  }
}