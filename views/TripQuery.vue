<template>
        <div class="d-flex justify-content-center align-items-center flex-column vh-100">
          <div v-if="showProgressBar" class="progress-bar">
            <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
          </div>

          <div  v-if="showMessage">
                <h1>Ready to make a trip powered with AI?</h1>

                <button @click="startQuery" class="btn btn-primary" style="margin-bottom: 10px" id="startTrip">Generate a Trip</button>
            </div>
            <component :is="currentComponent" @change-step="changeStep" @info="handleInfo"></component>

        </div>
    </template>

<script>
import Location from '../components/filters/Location.vue' // uncommented
import HowManyPeople from '../components/filters/HowManyPeople.vue'
import DaysAndDate from '../components/filters/DaysAndDate.vue'
import Budget from '../components/filters/Budget.vue'
import Keywords from '../components/filters/Keywords.vue'
import TripQuery from '../classes/TripQuery.js'
export default {
  data () {
    return {
      currentStep: -1,
      steps: ['Location', 'HowManyPeople', 'DaysAndDate', 'Budget', 'Keywords'], // add Location
      showMessage: true,
      showProgressBar: false,
      tripQuery: null
    }
  },
  components: {
    Location,
    HowManyPeople,
    DaysAndDate,
    Budget,
    Keywords
  },
  computed: {
    /**
    * Returns current step for component switching
    */
    currentComponent () {
      return this.steps[this.currentStep]
    },

    progressPercentage () {
      return (this.currentStep + 1) / this.steps.length * 100
    }
  },
  methods: {
    /**
    * Creates trip query object
    */
    startQuery () {
      console.log('startQuery method called')
      this.tripQuery = new TripQuery()
      this.currentStep = 0
      this.showMessage = false
      this.showProgressBar = true
    },
    /**
    * Steps through the components
    */
    changeStep (step) {
      if (step < this.steps.length) {
        console.log('changeStep method called', step)
        this.currentStep = step
      } else {
        // anything else?
      }
    },
    /**
    * Adds the info from selected filter options to the filter object
    */
    handleInfo ({ step, data }) {
      // Check which step the info corresponds to and call the appropriate setter method
      if (step === 'Location') {
        this.tripQuery.setLocation(data)
      } else if (step === 'HowManyPeople') {
        this.tripQuery.setNumPeople(data)
      } else if (step === 'DaysAndDate') {
        this.tripQuery.setTripDates(data)
      } else if (step === 'Budget') {
        this.tripQuery.setBudget(data)
      } else if (step === 'Keywords') {
        this.tripQuery.setFilterOptions(data)
      }
      sessionStorage.setItem('tripQuery', JSON.stringify(this.tripQuery))
      console.log(`Info received for ${step}:`, data)
    }
  }
}
</script>

<style>
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
}

.progress {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease-in-out;
}
</style>
