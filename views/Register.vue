<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex justify-content-center align-items-center flex-column vh-100">
      <h1 class="heading">Create An Account</h1>
      <div class="input-box">
        <div class="form-floating mb-3">
          <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
      </div>
      <!-- <p><input id="email" type="text" placeholder="Email" v-model="email"></p>
      <p><input id="password" type="password" placeholder="Password" v-model="password"></p> -->
      <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
      <button @click="register" class="btn btn-primary" style="margin-bottom: 10px" id="submit-sign-up">Submit</button>
      <p class="google-text">Or if you have a Google Account...</p>
      <button @click="signInWithGoogle" class="btn btn-secondary">Sign In With Google
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="google-icon bi bi-google" viewBox="0 0 16 16">
        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
      </svg></button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import router from '@/routes'

const email = ref('')
const password = ref('')
const errMsg = ref()

// Checks if password contains at least two numbers and is at least eight characters long
const validatePassword = (password) => {
  const containsTwoNumbers = /[0-9].*[0-9]/.test(password)
  const isAtLeastEightChars = password.length >= 8
  return containsTwoNumbers && isAtLeastEightChars
}

// users can register account with email and password
const register = () => {
  // Stop registration process if password is invalid
  if (!validatePassword(password.value)) {
    errMsg.value = 'Password needs to be at least 8 characters long and contain at least 2 numbers'
    return
  }

  // if password meets valid auth params then it is sent to firebase and stored as user
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully registered!')
      router.push('/tripquery')
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'You Need to Enter a Valid Email Address'
          break
        case 'auth/email-already-in-use':
          errMsg.value = 'An Account with that Email Already Exists'
          break
        case 'auth/invalid-password':
          errMsg.value = 'Password needs to be at least 8 characters long'
          break
        case 'auth/weak-password':
          errMsg.value = 'Password needs to be at least 8 characters long'
          break
        default:
          errMsg.value = 'An Error Occurred'
          break
      }
    })
}

// users can register account with Google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      router.push('/tripquery')
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}
</script>

<style>
  .heading {
    padding-bottom: 30px;
  }
</style>
