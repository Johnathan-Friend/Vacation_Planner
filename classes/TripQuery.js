export default class TripQuery {
  constructor (location, numPeople, tripDates, budget, filterOptions) {
    this.location = location
    this.numPeople = numPeople
    this.tripDates = tripDates
    this.budget = budget
    this.filterOptions = []
  }

  setLocation (location) {
    this.location = location
  }

  setNumPeople (numPeople) {
    this.numPeople = numPeople
  }

  setTripDates (tripDates) {
    this.tripDates = tripDates
  }

  setBudget (budget) {
    this.budget = budget
  }

  setFilterOptions (filterOptions) {
    this.filterOptions = filterOptions
  }

  getLocation () {
    return this.location
  }

  getNumPeople () {
    return this.numPeople
  }

  getTripDates () {
    return this.tripDates
  }

  getBudget () {
    return this.budget
  }

  getFilterOptions () {
    return this.filterOptions
  }
}
