<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="isLoading" class="spinner">
    <div>
  </div>
  </div>
  <div class="container">
    <div class="left">
      <!-- Content for left div -->
      <!-- Updated: Display the number of days -->
      <div class="grid-containerTEST">
        <TripResult v-if="showComponent" :numberOfDays="numberOfDays" :trip="trip" />
        <div class="containerTEST" id="map" style="height: 400px;"></div>
      </div>
    </div>
  </div>

  <div v-if="showComponent" class="d-flex flex-column align-items-center">
    <router-link to="tripquery" class="mb-3">
      <button type="button" class="btn btn-primary">Generate New Trip</button>
    </router-link>
    <button type="button" class="btn btn-outline-secondary" :class="{ 'btn-success': isSaved }" @click="saveTrip">{{
    saveText }}</button>
  </div>
</template>

<script setup>
import TripResult from '../components/TripResult.vue'
// eslint-disable-next-line no-unused-vars
import Trip from '../classes/Trip.js'
import { ref, onMounted, computed } from 'vue'
import openai from '../helpers/useOpenAi'
import * as Database from '../database/Database.js'

const tourPlan = ref('')
const coordinates1 = ref([])
const days = ref([])
const trip = ref(null)
const showComponent = ref(false)
const isLoading = ref(true) // Assume initial loading state (modify as needed)
const numberOfDays = ref(0)
const isSaved = ref(false)
const saveText = ref('Save Trip')

const saveTrip = async () => {
  if (isSaved.value === false) {
    isSaved.value = true
    saveText.value = 'Saved'

    try {
      const tripId = await Database.addTrip(trip.value.getTitle())
      const daysList = trip.value.getDaysList()
      daysList.forEach((day, index) => {
        Database.addDay(tripId, day.getItinerary())
      })
    } catch (e) {
      console.log(e)
    }
  }
}

/**
* Generate a 3-day tour plan using OpenAI GPT-3.
*
* @param {string} location - The location for which to generate the tour plan.
* @returns {Promise<string>} - The generated tour plan.
*/
// eslint-disable-next-line no-unused-vars

const generateTourPlan = async (location, coord, budget, tripdates, people) => {
  const initialMessage = [
    {
      role: 'assistant',
      content: `Please provide a vacation iterniary for x amount of days for this timeline ${tripdates} and for ${location} close to these ${coord}. 
    For the budget id like it to be ${budget} out of $$$ and ${people}.
    in formatting add a break tags for every day after day 1 and put days x in h1 tags, 
    individually it should be <h1>Day 1</h1 ><p>all the text here for the day</p> for example and anything that's text related 
    inside a <p> tag under each day PLEASEEEEEEE. Generate a good length of a recommendation too`
    }
  ]

  const chatCompletion = await openai.chat.completions.create({
    messages: initialMessage,
    model: 'gpt-3.5-turbo',
    stream: true
  })

  let generatedPlan = ''

  for await (const chunk of chatCompletion) {
    if (chunk.choices) {
      generatedPlan += chunk.choices[0].delta.content
    }
  }

  tourPlan.value = generatedPlan
  // console.log(generatedPlan)
  return tourPlan.value
}

/**
* Extract coordinates for locations mentioned in the generated plan.
*
* @param {string} generatedPlan - The generated tour plan.
* @returns {Promise<Array>} - An array of location coordinates.
*/
// eslint-disable-next-line no-unused-vars
const findCoord = async (generatedPlan) => {
  const initialMessage1 = [
    {
      role: 'assistant',
      content: `evaluate the following content for locations: 
    ${generatedPlan}. 
    Return an array like this for every location mentioned:
    {title: "USS North Carolina Battleship",lat: 34.2257,lng: -77.9453}
    Make it as precise so I wouldn't need to worry about white spaces to convert it using JSON.parse, with no period at the end`
    }
  ]

  const chatCompletion1 = await openai.chat.completions.create({
    messages: initialMessage1,
    model: 'gpt-3.5-turbo',
    stream: true
  })

  let extractedLocations = ''

  for await (const chunk of chatCompletion1) {
    if (chunk.choices && chunk.choices[0].delta && chunk.choices[0].delta.content) {
      extractedLocations += chunk.choices[0].delta.content
    }
  }

  console.log(extractedLocations)
  // eslint-disable-next-line no-eval
  const coordinatesArray = eval(extractedLocations)
  // console.log(coordinatesArray)
  coordinates1.value = coordinatesArray

  return coordinates1.value
}

/**
* Process the tour plan into individual paragraphs for each day.
*
* @returns {Promise<Array>} - An array of paragraphs for each day.
*/
// eslint-disable-next-line no-unused-vars
const processParagraphs = async () => {
  const content = tourPlan.value
  const days = content.split('<h1>')
  let paragraphs = []
  // the logic may be wrong here, it should  be split everything between '<days #>' instead of '<p'
  days.forEach((day, index) => {
    if (index !== 0) {
      // eslint-disable-next-line no-unused-vars
      const [_, dayDescription] = day.split('</h1>')
      const processedDescription = dayDescription?.replace(/undefined$/, '')

      if (processedDescription) {
        const paragraphsInDay = processedDescription.split('<p>').map(p => p.replace('</p>', '').trim()).filter(p => p)
        paragraphs = [...paragraphs, ...paragraphsInDay]
      } else {
        console.log('Warning: dayDescription is undefined for day', index + 1, '. Skipping paragraph processing.')
      }
    }
  })

  // console.log(paragraphs)
  // this is where youll add the days into the databse to save them

  return paragraphs
}

onMounted(async () => {
  const storedTripQuery = sessionStorage.getItem('tripQuery')
  const tripQuery = storedTripQuery ? JSON.parse(storedTripQuery) : null
  console.log('Retrieved tripQuery from session storage: ', tripQuery)
  console.log(tripQuery.budget.price) // $$
  console.log(tripQuery.location.name) // Downtown Wilmington Visitor Information
  console.log(tripQuery.location.geometry.location) // Coordinates
  console.log(tripQuery.tripDates)
  console.log(tripQuery.numPeople)

  const plan = await generateTourPlan(tripQuery.location.name, tripQuery.location.geometry.location, tripQuery.budget.price, tripQuery.tripDates, tripQuery.numPeople)
  console.log(plan)

  const updatedCoordinates = await findCoord(plan)
  console.log(updatedCoordinates)

  const script = document.createElement('script')
  script.async = true
  script.src = 'your-api-key-goes-here'
  document.head.appendChild(script)

  const newTrip = new Trip(tripQuery.location.name)
  const paragraphs = await processParagraphs()
  console.log(paragraphs)

  paragraphs.forEach(p => newTrip.addDayToDaysList(p))
  console.log('hello')

  trip.value = newTrip
  numberOfDays.value = newTrip.getDaysList().length
  showComponent.value = true
  isLoading.value = false
  // so far it works with catching how many days
  // eslint-disable-next-line no-undef
  days.value = trip.value ? trip.value.getDaysList() : []
})

/**
* Initialize the Google Map and display markers for extracted coordinates.
*/
window.initMap = async () => {
  let totalLat = 0
  let totalLng = 0
  // eslint-disable-next-line no-undef
  const bounds = new google.maps.LatLngBounds()

  coordinates1.value.forEach(coord => {
    totalLat += coord.lat
    totalLng += coord.lng
    // eslint-disable-next-line no-undef
    bounds.extend(new google.maps.LatLng(coord.lat, coord.lng))
  })

  const avgLat = totalLat / coordinates1.value.length
  const avgLng = totalLng / coordinates1.value.length

  const centerCoordinates = {
    lat: avgLat,
    lng: avgLng
  }

  const mapWidth = document.getElementById('map').offsetWidth
  const mapHeight = document.getElementById('map').offsetHeight
  const ne = bounds.getNorthEast()
  const sw = bounds.getSouthWest()

  const WORLD_DIM = { height: 256, width: 256 }
  const ZOOM_MAX = 21

  const latFraction = (ne.lat() - sw.lat()) / 180
  const lngFraction = (ne.lng() - sw.lng()) / 360

  const latZoom = Math.log(mapHeight / WORLD_DIM.height / latFraction) / Math.LN2
  const lngZoom = Math.log(mapWidth / WORLD_DIM.width / lngFraction) / Math.LN2

  let zoom = Math.min(Math.floor(Math.min(latZoom, lngZoom)), ZOOM_MAX)

  // Set the zoom level to fit within reasonable bounds
  zoom = Math.max(0, Math.min(zoom, ZOOM_MAX))

  console.log('Optimal Zoom Level:', zoom)

  // eslint-disable-next-line no-undef
  const { Map } = await google.maps.importLibrary('maps')

  const map = new Map(document.getElementById('map'), {
    center: centerCoordinates,
    zoom,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  })

  map.setOptions({ scrollwheel: false })

  coordinates1.value.forEach(coord => {
    // eslint-disable-next-line no-undef, no-unused-vars
    const marker = new google.maps.Marker({
      position: { lat: coord.lat, lng: coord.lng },
      map,
      title: coord.title,
      icon: coord.icon,
      // eslint-disable-next-line no-undef
      animation: google.maps.Animation.DROP
    })
  })
}

/**
* Computed property to format the tour plan.
*
* @returns {string} - The formatted tour plan.
*/
// eslint-disable-next-line no-unused-vars
const formattedTourPlan = computed(() => {
  return `${tourPlan.value}`
})

// /**
//  * Computed property to calculate the number of days in the trip.
//  *
//  * @returns {number} - The number of days in the trip.
//  */
// const numberOfDays = computed(() => {
//   return days.value.length
// })

</script>

<style>
.btn-success {
  --bs-btn-bg: #6c757d;
  --bs-btn-color: white;
}

.container {
  height: 70vh;
}

.left {
  margin-left: 0px;
  margin-right: 8px;
}

.center {
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

.containerTEST {
  max-height: 75vh;
}

.grid-containerTEST {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.spinner {
  position: fixed;
    top: 50%;
    left: 50%;
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-radius: 50%;
  border-top-color: green;
  /* Adjust color here */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
