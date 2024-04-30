<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100">
        <h1>Database</h1>
        <input type="text" v-model="tripTitle" placeholder="Enter Trip Name">
        <button @click="addToDatabase" style="margin-bottom: 20px;">Add to Database</button>
        <input type="text" v-model="docRef" placeholder="Enter Trip Doc ID">
        <!-- <input type="text" v-model="dayTitle" placeholder="Enter Day Name"> -->
        <input type="text" v-model="dayStuff" placeholder="Enter stuff you did that day">
        <button @click="addDayToDB" style="margin-bottom: 20px;">Add to Database</button>
        <input type="text" v-model="tripID" placeholder="Enter Trip ID">
        <button @click="deleteFromDatabase" style="margin-bottom: 20px;">Delete from Database</button>
        <button @click="seeDatabase">View all Trips in DB</button>
    </div>
</template>

<script>
import { ref } from 'vue'
import * as database from './Database.js'
// import Trip from '../classes/Trip.js'
// import Day from '../classes/Day.js'

export default {
  name: 'DatabaseComponent',
  setup () {
    const tripTitle = ref('')
    const tripID = ref('')
    const dayStuff = ref('')
    const dayTitle = ref('')
    const docRef = ref('')
    let trip = null

    // Call the function to add data to the database
    const addToDatabase = async () => {
      trip = await database.addTrip(tripTitle.value)
      console.log(trip)
      tripTitle.value = ''
    }

    const deleteFromDatabase = async () => {
      const trip = await database.getTrip(tripID.value)
      console.log(trip)
      tripID.value = ''
    }

    const seeDatabase = async () => {
      console.log(await database.getAllTrips())
      // console.log(await database.deleteUserData())
    }

    const addDayToDB = async () => {
      await database.addDay(docRef.value, dayStuff.value)
    }

    return {
      tripTitle,
      tripID,
      dayStuff,
      dayTitle,
      docRef,
      addToDatabase,
      deleteFromDatabase,
      seeDatabase,
      addDayToDB
    }
  }
}
</script>

<style>

</style>
