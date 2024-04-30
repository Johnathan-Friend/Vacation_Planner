<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100">
        <h1>Budget</h1>
        <div>Select your travel budget</div>
        <input type="range" v-model="selectedPrice" :min="0" :max="priceLevels.length - 1" />
        <div>{{ priceLevels[selectedPrice] }}</div>
        <div>
            <input type="checkbox" id="noBudget" v-model="noBudget">
            <label for="noBudget">I do not have a travel budget</label>
        </div>
        <div class="d-flex">
                <button type="button" class="btn btn-primary" @click="nextStep">Next</button>
                <button type="button" class="btn btn-secondary" @click="backStep">Back</button>
        </div>
    </div>
</template>

<script>
// import GoBack from '../GoBack.vue'
export default {
  data () {
    return {
      priceLevels: ['$', '$$', '$$$'],
      selectedPrice: 0, // Index of the selected option
      noBudget: false,
      selectedBudget: { price: '$' } // Defaults to lowest budget
    }
  },
  watch: {
    selectedPrice (newVal) {
      if (!this.noBudget) {
        this.selectedBudget = { price: this.priceLevels[newVal] }
        // Log
        console.log('Updated selectedBudget: ', this.selectedBudget)
      }
    },
    noBudget (newVal) {
      if (newVal) {
        this.selectedBudget = null
      } else {
        this.selectedBudget = { price: this.priceLevels[this.selectedPrice] }
      }
      // Log
      console.log('Updated selectedBudget due to noBudget selected: ', this.selectedBudget)
    },
    mounted () {
      // Log initial selectedBudget
      console.log('Initial selectedBudget: ', this.selectedBudget)
    }
  },
  // components: {
  //     GoBack
  // },
  methods: {
    nextStep () {
      this.$emit('info', { step: 'Budget', data: this.selectedBudget })
      this.$emit('change-step', 4) // changed from 3 to 4
    },
    backStep () {
      this.$emit('change-step', 2) // change steps in each component after location is added
    }
  }
}
</script>
