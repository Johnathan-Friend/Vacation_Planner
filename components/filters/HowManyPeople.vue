<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100">
      <h1>How many people?</h1>
      <div class="button-group">
        <button
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          :class="{'btn': true, 'btn-primary': selectedOption === option, 'btn-secondary': selectedOption !== option}"
          type="button">
          {{ option }}
        </button>
      </div>
      <div class="d-flex mt-3">
        <button type="button" class="btn btn-primary" @click="nextStep">Next</button>
        <button type="button" class="btn btn-secondary" @click="backStep">Back</button>
      </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      options: ['Solo', 'Partner', 'Friends', 'Family'],
      selectedOption: 'Solo'
    }
  },
  watch: {
    selectedOption (newVal, oldVal) {
      console.log(`User selected option: ${newVal}`)
    }
  },
  methods: {
    selectOption (option) {
      this.selectedOption = option
    },
    nextStep () {
      this.$emit('info', { step: 'HowManyPeople', data: this.selectedOption })
      this.$emit('change-step', 2) // changed from 1 to 2
    },
    backStep () {
      this.$emit('change-step', 0)
    }
  }

}
</script>

  <style>
  .button-group button {
    margin: 0.5rem;
  }
  </style>
