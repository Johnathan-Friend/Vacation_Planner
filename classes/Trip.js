import Day from './Day.js'

export default class Trip {
  constructor (title) {
    this.ID = null
    this.title = title
    this.daysList = []
  }

  setID (IDfromDB) {
    this.ID = IDfromDB
  }

  getID () {
    return this.ID
  }

  getTitle () {
    return this.title
  }

  getDaysList () {
    return this.daysList
  }

  setDaysList (daysList) {
    this.daysList = daysList
  }

  getNumberOfDays () {
    return this.daysList.length
  }

  addDayToDaysList (itenerary) {
    const day = new Day(itenerary)
    this.daysList.push(day)
  }
}
