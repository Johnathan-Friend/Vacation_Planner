<template>
  <div class="card">
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
import Trip from '@/classes/Trip'
import { ref } from 'vue'

// Props
const props = defineProps({
  numberOfDays: { type: Number, required: true },
  trip: { type: Trip, required: true }

})

// Start State
const selectedDay = ref('Day 1')
const days = props.trip.getDaysList()
const dayInfo = ref(days[0].getItinerary())

// updates the h3 element on click
const updateDay = (day) => {
  selectedDay.value = day
}

// get the day info on click
const getDayInfo = (day) => {
  const days = props.trip.getDaysList()
  dayInfo.value = days[day - 1].getItinerary()
}
</script>

<style>
.card {
  height: 100%;
  width: 100%;
}

.space {
  margin-right: 8px;
}
</style>
