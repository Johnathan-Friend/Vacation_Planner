<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100">
        <head>
          <title>Location</title>
        </head>
        <p class="directions">Enter a destination in the search box below.</p>

        <!-- Display error message if inputted location is not in the database; i.e., misspelled, imaginary, etc -->
        <div class="error-message" v-show="showInvalidLocationErr">
            <p>Please select a location from the dropdown menu</p>
        </div>

        <!-- Display error message if the user attempts to proceed without selecting an option on the page -->
        <div class="error-message" v-show="showNoValueErr">
            <p>Please enter a destination in the search bar</p>
        </div>

        <div class="options">
            <!-- Input box with autofill; replaced with Google Places API -->
            <input id="autocomplete" type="text" placeholder="Enter a Destination" ref="locationInput" class="locationInput">

        </div>

        <div class="suggestions-container">
          <ul class="suggestions">
              <li v-for="suggestion in autocompleteSuggestions" :key="suggestion.place_id" @click="selectSuggestion(suggestion)">
                  {{ suggestion.description }}
              </li>
          </ul>
        </div>

        <!-- nextStep provides logic for displaying the next Vue component -->
        <div class="continue">
            <button id="continue" class="btn btn-primary" @click="nextStep">Next</button>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      location: null, // variable to be stored as part of TripQuery object (location)
      showInvalidLocationErr: false,
      showNoValueErr: false,
      autocompleteSuggestions: []
    }
  },

  methods: {
    async initAutocomplete () {
      const script = document.createElement('script')
      script.src = 'your-key-goes-here'
      script.defer = true
      script.async = true

      script.onload = () => {
        // eslint-disable-next-line no-undef
        this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'),
          {
            fields: ['place_id', 'geometry', 'name']
          })

        this.autocomplete.addListener('place_changed', this.onPlaceChanged)
      }

      document.head.appendChild(script)
    },

    async onPlaceChanged () {
      const place = this.autocomplete.getPlace()

      if (!place.geometry) {
        this.showInvalidLocationErr = true
        this.autocompleteSuggestions = []
      } else {
        this.showInvalidLocationErr = false
        this.autocompleteSuggestions = place.predictions
      }
    },

    async nextStep () {
      const userInput = this.$refs.locationInput.value.trim()

      if (userInput !== '') {
        const place = await this.autocomplete.getPlace()

        if (place && place.geometry) {
          this.location = place
          // console.log(place);
          // console.log(this.location);
          this.$emit('info', { step: 'Location', data: this.location })
          this.$emit('change-step', 1) // added back in
        } else {
          this.showNoValueErr = false
          this.showInvalidLocationErr = true
        }
      } else {
        this.showNoValueErr = true
        this.showInvalidLocationErr = false
      }
    }

  },

  mounted () {
    this.initAutocomplete()
  }

}
</script>

<style>
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    cursor: pointer;
    padding: 5px;
}

.directions {
    font-style: italic;
}

.options{
    padding-bottom: 10px;

}

.locationInput {
    margin-right: 10px; /*provide spacing between input field and checkbox*/
}

.suggestions-container {
  display: none;
}

.error-message {
    color: red;
    font-style: italic;
}
</style>
