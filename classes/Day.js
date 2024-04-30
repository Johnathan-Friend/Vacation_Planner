export default class Day {
  constructor (itinerary) {
    this.ID = null
    this.itinerary = itinerary
    // this.locations = [];
  }

  setID (IDfromDB) {
    this.ID = IDfromDB
  }

  getID () {
    return this.ID
  }

  getItinerary () {
    return this.itinerary
  }

  // getlocations(){
  //     return this.locations
  // }

  // addlocation(Location){
  //     this.locations.push(Location);
  // }
}
