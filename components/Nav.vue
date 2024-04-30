<!-- eslint-disable vue/multi-word-component-names -->

  <template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div>
          <img src="../.././images/logo.png" class="logo" alt="mountain logo">
          <a class="navbar-brand" href="/tripquery" v-if="isLoggedIn">Plan My Journey</a>
          <a class="navbar-brand" href="/" v-if="!isLoggedIn">Plan My Journey</a>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <ul class="nav ms-auto nav-underline">
            <li class="nav-item"><a v-if="isLoggedIn" class="nav-link" href="/userdashboard">UserDashboard</a></li>
            <li class="nav-item">
              <button @click="handleSignOut" v-if="isLoggedIn" class="btn btn-light" type="button">Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from '@/routes'

const isLoggedIn = ref(false)
let auth

// sets up an observer for changes in the user's authentication state when the component is mounted
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

// signs the user out and redirects them to the home page upon successful sign-out.
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}

</script>

<style>
  .bg-body-tertiary {
    background-color: #49BF55 !important;
  }

  .navbar-brand {
    color: white;
    font-weight: 600;
  }

  .logo {
    width: 50px;
    padding-right: 5px;
  }

  .container-fluid {
    padding-left: 15px;
  }

  .nav-link {
    color: black;
  }

  .nav-link:hover {
    color: black;
  }

</style>
