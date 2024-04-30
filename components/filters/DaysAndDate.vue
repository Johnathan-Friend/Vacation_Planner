<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100">
      <h1>Days and Dates</h1>
      <form @submit.prevent="submitForm">
        <!--Start Month Group-->
        <div class="form-group">
          <label for="startMonth">Start Month:</label>
          <select v-model="startMonth" class="form-control" id="startMonth">
            <option v-for="(month, index) in months" :value="index + 1" :key="index">{{ month }}</option>
          </select>
        </div>

        <!--Start Day-->
        <div class="form-group">
          <label for="startDay">Start Day:</label>
          <select v-model="startDay" class="form-control" id="startDay">
            <option v-for="day in days" :value="day">{{ day }}</option>
          </select>
        </div>

        <!--End Month-->
        <div class="form-group">
          <label for="endMonth">End Month:</label>
          <select v-model="endMonth" class="form-control" id="endMonth">
            <option v-for="(month, index) in months" :value="index + 1" :key="index">{{ month }}</option>
          </select>
        </div>

        <!--End Day-->
        <div class="form-group">
          <label for="endDay">End Day:</label>
          <select v-model="endDay" class="form-control" id="endDay">
            <option v-for="day in days" :value="day">{{ day }}</option>
          </select>
        </div>

        <!--Buttons-->
        <div class="button-container">
          <button type="button" class="btn btn-primary" @click="nextStep">Next</button>
          <button type="button" class="btn btn-secondary" @click="backStep">Back</button>
        </div>
      </form>

      <!--Err Messages-->
      <div class="error-message-length" v-show="showTripLengthErr"> <!--Display if trip length > 5 days-->
        <p>Please choose dates within the accepted range. Trip cannot exceed a length of 5 days.</p>
      </div>
      <div class="error-message-timeframe" v-show="showTimeframeErr"> <!--Display if end date before start date-->
        <p>End date cannot be before start date. Please choose an appropriate start date.</p>
      </div>

      <!--Confirmation box; for no dates entered-->
      <div class="hidden-box" v-show="showConfirmation">
        <h4>WARNING!</h4>
        <p>You have not entered any dates. Are you sure you want to continue?</p>
        <button @click="handleYes" class="box-btn">Yes</button>
        <button @click="handleNo">No</button>
      </div>
    </div>
</template>

<script>
import TripDates from '../../TripDates.js'
export default {
  data () {
    return {
      startMonth: null,
      startDay: null,
      endMonth: null,
      endDay: null,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      days: Array.from({ length: 31 }, (_, i) => i + 1), // creates array populated with values 1-31; common for arrays with a range of #'s
      showConfirmation: false,
      showTripLengthErr: false,
      showTimeframeErr: false
    }
  },

  methods: {
    submitForm () {
      // Validate before submission
      if (this.validateForm()) {
        const formData = new TripDates(this.startDay, this.months[this.startMonth - 1], this.endDay, this.months[this.endMonth - 1])
        console.log(formData.getInfo())
        return true
      } else {
        console.log('Form validation falied. Cannot proceed')
        return false
      }
    },

    validateForm () {
      const startDate = new Date(2024, this.startMonth - 1, this.startDay)
      const endDate = new Date(2024, this.endMonth - 1, this.endDay)
      if (endDate < startDate) {
        this.showTimeframeErr = true
        return false // Validation failed
      }

      const differenceInTime = endDate.getTime() - startDate.getTime()
      const differenceInDays = differenceInTime / (1000 * 3600 * 24)

      if (differenceInDays > 5) {
        this.showTripLengthErr = true
        return false // Validation failed
      }

      if (this.startDay == null && this.startMonth == null && this.endDay == null && this.endMonth == null) {
        this.showConfirmation = true
        return false
      }

      // Form validation passed
      return true
    },

    handleYes () {
      this.$emit('change-step', 3) // changed from 2 to 3
    },

    handleNo () {
      this.showConfirmation = false
    },
    nextStep () {
      const isFormValid = this.submitForm()
      if (isFormValid) {
        const infoString = `startDay: ${this.startDay}, startMonth: ${this.startMonth}, endDay: ${this.endDay}, endMonth: ${this.endMonth}`
        this.$emit('info', {
          step: 'DaysAndDate',
          data: infoString
        })
        // If true, emit change-step to go to the next step
        this.$emit('change-step', 3)
      }
    },
    backStep () {
      this.$emit('change-step', 1) // change steps in each component after location is added
    }
  }
}

</script>

<style>
  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }

  .form-group{
    text-align: center;
  }

  .hidden-box {
    width: 40%;
    height: 20%;
    background-color: #f0f0f0;
    border: 2px solid black;
    text-align: center;
    transform: translate(0,-200%);
    border-radius: 1.4rem;
  }

  .box-btn {
    margin-right: .4rem;
  }

  div.hidden-box > h4 {
    padding-top: 1%;
  }

  .error-message-length, .error-message-timeframe {
    display: inline-flex;
    font-size: 12px;
    width: 10%;
    height: 15%;
    padding: 2px 4px;
    border-radius: .5rem;
    color: red;
    transform: translate(95%, -320%);
    text-align: center;
    align-items: center;
    background-color: #f0f0f0;
    border: 2px solid black;
    font-family: Arial, sans-serif;
    flex-wrap: wrap;
  }

</style>
