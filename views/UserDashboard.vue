<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, reauthenticateWithCredential, deleteUser, updatePassword, EmailAuthProvider } from 'firebase/auth'
import router from '@/routes'
import { deleteUserData } from '@/database/Database'
import * as database from '@/database/Database'
import ShowTrips from '../components/ShowTrips.vue'
const auth = getAuth()
const user = auth.currentUser
const email = user.email
const edit = ref([])
const signinMethod = user.providerData[0].providerId
const editchoice = ref([])
const oldPassword = ref('')
const newPassword = ref('')
let authCredential
const valid = ref([])
const tripsToShowTrip = ref([])

// johnathan's code
const userTrips = ref(null)
const showComponent = ref(false)
// Josh's Code
// let trip = []
// const showtripcomp = ref(false)
// johnathan's code
onMounted(async () => {
  const databaseTrips = await database.getAllTrips()

  for (const tripName in databaseTrips) {
    if (Object.hasOwnProperty.call(databaseTrips, tripName)) {
      const tripId = databaseTrips[tripName]
      try {
        const tripFromDB = await database.getTrip(tripId)
        tripFromDB.setID(tripId)
        tripsToShowTrip.value.push(tripFromDB)
      } catch (e) {
        console.log(e)
      }
    }
  }

  // console.log(databaseTrips)
  userTrips.value = databaseTrips
  showComponent.value = true

  // Josh's Code
  // for (let i = 0; i < Object.values(databaseTrips).length; i++) {
  // const tripinfo = await database.getTrip(Object.values(databaseTrips)[i])
  // console.log(tripinfo)
  // trip.push(Object.values(tripinfo))
  // }
  // console.log(trip)
  // showtripcomp.value = true
})

// const tripcaller = await database.getAllTrips()
// var userTrips = ref(null)
// userTrips.value = tripcaller
// console.log(userTrips)
</script>
<template>
  <title>UserDashboard</title>
    <div class="d-flex justify-content-center align-items-center flex-column vh-50" v-if="signinMethod == 'password'">
        <h1>Account Details</h1>
        <p>User signed in with: {{ email }}</p>
        <label class="DispInline" for="editer">Edit Account Info?</label>
        <input class="DispInline" type="checkbox" name="editer" value="true" v-model="edit" >
        <div v-if="edit.includes('true')">
            <input id="oldpassword" type="password" v-model="oldPassword" placeholder="enter old password" />
            <input type="button" value="Re-enter Password" @click="reauthenticateWithCredential(user, authCredential = EmailAuthProvider.credential(email, oldPassword)).then(() => {
  console.log('successful')
  valid.push('true')
}).catch((error) => {
  valid= ['false']
});"/>
        </div>
        <div class="justify-content-center align-items-center" v-if="edit.includes('true') && valid.includes('true')">
        <label class="spacer" for="Pass">Change Password</label>
        <input type="radio" id = "ChangeChoice" value="Pass" v-model="editchoice">
        <label class="spacer" for="AccDelete">Delete Account</label>
        <input type="radio" id = "ChangeChoice" value="AccDelete" v-model="editchoice">
        </div>

        <div v-if="editchoice.includes('Pass') && edit.includes('true')">
            <input id="password" type="password" v-model="newPassword" placeholder="enter new password" />
            <input type = "button" value="Change Password"  @click="reauthenticateWithCredential(user,authCredential).then(() => {
 console.log('Reauthentication Successful')
 // User re-authenticated.
 updatePassword(user, newPassword).then(() => {
             console.log('updated');
  // Update successful.
}).catch((error) => {
    console.log('Update failed')
  // An error ocurred
  // ...
});
}).catch((error) => {
  console.log('Reauthentication Failed')
});

           ">
        </div>

        <div v-if="editchoice.includes('AccDelete') && edit.includes('true')" class="d-flex justify-content-center align-items-center flex-column vh-50">
        <h2>Delete Account</h2>
        <input  type="button" value="Delete User" @click="reauthenticateWithCredential(user,authCredential).then(()=>{
  console.log('Reauthentication Successful');
  deleteUserData().then(() => {
        deleteUser(user).then(() => {console.log('Delete Successful'); router.push('/')}).catch((error) => {console.log('Firebase Delete Failed')}); console.log('Data Delete Successful') }).catch((error) =>{console.log('Database Delete Failed')})
}).catch((error) => {
  console.log('Wrong Password')
  // ...
});">
    </div>

    </div>
    <!--Google Sign-in Account Page-->
    <div class="d-flex justify-content-center align-items-center flex-column vh-50" v-if="signinMethod == 'google.com'">
        <h1>Account Details</h1>
        <p>User signed in with: {{ email }}</p>
        <label class="DispInline" for="editer">Edit Account Info?</label>
        <input class="DispInline" type="checkbox" name="editer" value="true" v-model="edit" >
        <div class="justify-content-center align-items-center" v-if="edit.includes('true')">
        <h2>Delete Account</h2>
    <input type="button" value="Delete User" @click="deleteUserData().then(() => {
        deleteUser(user).then(() => {console.log('Delete Successful'); router.push('/')}).catch((error) => {console.log('Firebase Delete Failed')}); console.log('Data Delete Successful') }).catch((error) =>{console.log('Database Delete Failed')})">
    </div>

    </div>
    <div class="d-flex justify-content-center align-items-center flex-column padding">
      <ShowTrips v-if="showComponent" :trips="tripsToShowTrip" />
        <!-- <h1>Past Trips</h1>
        <div v-if="showtripcomp">
          <ul>
            <template v-for="x in Object.keys(userTrips).length">
              <h3>{{ Object.keys(userTrips)[x-1] }}</h3>
              <input type="button" value="Delete" @click="database.deleteTrip(Object.values(userTrips)[x-1]).then(()=>{this.$router.go()}) ">
              <ul v-for="n in trip[x-1][2].length">
                <h4>{{ trip[x-1][2][n-1].ID }}</h4>
                <p>{{ trip[x-1][2][n-1].itinerary }}</p>
              </ul>
            </template>
          </ul>
        </div>
        <div v-if="showComponent">
          <div v-if="Object.keys(userTrips).length==0">
          <h3>User has no saved trips</h3>
          <input type="button" value = 'Create Trip' @click='router.push("/tripquery")'>
        </div>
        </div> -->
    </div>
    </template>

<script>
export default {
  data () {
    return {

    }
  }
}

</script>

    <style>
    .padding{
        padding-top: 100px;
    }
    .spacer{
        padding-left: 20px;
    }
    .DispInline{
        display: inline-block;
    }
    </style>
    const user = getAuth().currentUseremail()
