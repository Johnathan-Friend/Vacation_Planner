<template>
    <div v-if="!isLoaded">
        <h1>Past Trips:</h1>
        <div v-if="trips.length === 0">No past trips available.</div>
        <div v-else>
        <div v-for="(trip, index) in trips" :key="index" class="card">
            <div class="card-body">
            <h5 class="card-title">{{ trip.getTitle() }}</h5>
            <button class="btn btn-primary" @click="viewTrip(index)">View Trip</button>
            <button class="btn btn-danger" @click="deleteTrip(index)">Delete Trip</button>
            </div>
        </div>
        </div>
    </div>
    <div class="card" v-if="isLoaded">
        <!-- This is where the day # buttons will go -->
        <div class="card-header">
            <button
                v-for="day in numberOfDays"
                :key="day"
                type="button"
                class="btn btn-outline-success space"
                @click="updateDay('Day ' + day); getDayInfo(day)"
            >
                Day {{ day }}
            </button>
            <button class="btn btn-secondary" @click="goBack">Back</button>
        </div>
            <div class="card-body">

                <!-- This is where the day # text will go -->
                <h3 class="card-title">{{ selectedDay }}</h3>

                <!-- this is where the itenerary information for that day will go -->
                <p class="card-text">{{ dayInfo }}</p>
            </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import * as Database from '../database/Database.js'

const isLoaded = ref(false)
const selectedDay = ref('Day 1')
const days = ref(null)
const dayInfo = ref(null)
const numberOfDays = ref(0)
const currentIndex = ref(0)

const props = defineProps({
  trips: { type: Array, required: true }
})

// Function to handle viewing a trip
const viewTrip = (index) => {
  currentIndex.value = index
  days.value = props.trips[index].getDaysList()
  dayInfo.value = days.value[0].getItinerary()
  numberOfDays.value = days.value.length
  isLoaded.value = true
}

const goBack = () => {
  isLoaded.value = false
}

// updates the h3 element on click
const updateDay = (day) => {
  selectedDay.value = day
}

// get the day info on click
const getDayInfo = (day) => {
  days.value = props.trips[currentIndex.value].getDaysList()
  dayInfo.value = days.value[day - 1].getItinerary()
}

// Function to handle deleting a trip
const deleteTrip = async (index) => {
  const tripId = props.trips[index].getID()
  await Database.deleteTrip(tripId)
  // eslint-disable-next-line vue/no-mutating-props
  props.trips.splice(index, 1)
}

</script>

<style>
.card {
  margin-bottom: 20px;
}
</style>
