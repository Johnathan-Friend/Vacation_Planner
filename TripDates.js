export default class TripDates {
  constructor (startDay, startMonth, endDay, endMonth) {
    this.startDay = startDay
    this.startMonth = startMonth
    this.endDay = endDay
    this.endMonth = endMonth
  }

  setStartDay (startDay) {
    this.startDay = startDay
  }

  setStartMonth (startMonth) {
    this.startMonth = startMonth
  }

  setEndDay (endDay) {
    this.endDay = endDay
  }

  setEndMonth (endMonth) {
    this.endMonth = endMonth
  }

  getStartDay () {
    return this.startDay
  }

  getStartMonth () {
    return this.startMonth
  }

  getEndDay () {
    return this.endDay
  }

  getEndMonth () {
    return this.endMonth
  }

  // methods related to the trip length will go here...

  getInfo () {
    return {
      startDay: this.startDay,
      startMonth: this.startMonth,
      endDay: this.endDay,
      endMonth: this.endMonth
    }
  }
}
