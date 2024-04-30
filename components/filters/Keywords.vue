<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import KeywordFilter from '@/KeywordFilter'
const Keywords = ref([]) // This allows the array to be updated in real time
const OtherText = ref('') // Real Time update for text input
const OtherChosen = ref([]) // Allows Other textbox to be displayed and not mess with other array elements
const Filter = new KeywordFilter()  // This stores the choices when the form is submitted
</script>

<template>
<div class="d-flex justify-content-center align-items-center flex-column vh-100">
<h1>Keywords</h1>
     <p>Choose Up to 5 Keywords to help narrow down your search</p>
     <p v-if="Keywords.length + OtherChosen.length < 4">{{5 - (Keywords.length + OtherChosen.length) }} choices remaining</p>
     <p v-if="Keywords.length + OtherChosen.length == 4">1 choice remains</p>
     <p v-if="Keywords.length + OtherChosen.length == 5">To choose different choices remove previous choices</p>
    <div class="d-flex">
        <form>
            <label class="spacer" for ="Sports">Sports</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Sports')" type="checkbox" name ="Sports" value ="Sports" v-model ="Keywords">
            <!--v-if statements toggle visibility of checkboxes. Disable did not work so removing the checkboxes made things work.-->
            <label class="spacer" for ="Food">Food</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Food')"  type="checkbox" name ="Food" value ="Food" v-model ="Keywords">
            <label class="spacer" for ="Outdoors">Outdoors</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Outdoors')" type="checkbox" name ="Outdoors" value ="Outdoors" v-model ="Keywords">
            <br>
            <label class="spacer" for ="Music">Music</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Music')" type="checkbox" name ="Music" value ="Music" v-model ="Keywords">
            <label class="spacer" for ="Art">Art</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Art')" type="checkbox" name ="Art" value ="Art" v-model ="Keywords">
            <label class="spacer" for ="Shopping">Shopping</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Shopping')" type="checkbox" name ="Shopping" value ="Shopping" v-model ="Keywords">
            <br>
            <label class="spacer" for ="Religion">Religion</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Religion')"  type="checkbox" name ="Religion" value ="Religion" v-model ="Keywords">
            <label  class="spacer" for ="History">History</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('History')" type="checkbox" name ="History" value ="History" v-model ="Keywords">
            <label class="spacer" for ="Culture">Culture</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || Keywords.includes('Culture')"  type="checkbox" name ="Cutlure" value ="Culture" v-model ="Keywords">
            <br>
            <label class="spacer" for OtherToggle>Other</label>
            <input v-if ="(Keywords.length + OtherChosen.length) < 5 || OtherChosen.length == 1" type="checkbox" name="OtherToggle" value="checked" v-model="OtherChosen">
            <input  class="spacer2" v-if = "OtherChosen.length == 1"  type="text" name="Otherbox" v-model="OtherText" placeholder="Enter a 1 word Keyword">
        </form>
    </div>
    <router-link to="/results">
        <button @click="if (OtherText != '') {Keywords.push(OtherText)}; Filter.setFilterChoices(Keywords); console.log(Filter.getFilterChoices())" type="button" class="btn btn-primary" >Generate Trip</button>
    </router-link>
    <button type="button" class="btn btn-secondary" @click="backStep">Back</button>
</div>
</template>
<script>
// import GoBack from '../GoBack.vue'
export default {
  data () {
    return {

    }
  },
  // components: {
  //     GoBack
  // },
  methods: {
    nextStep () {
      this.$emit('change-step', 5) // changed from 4 to 5
    },
    backStep () {
      this.$emit('change-step', 3) // change steps in each component after location is added
    }
  }
}
</script>
<style>
.spacer {
padding-left: 25px;
padding-right: 5px;
}
.spacer2{
    margin-left: 10px;
    padding-left: 10px;
}
</style>
