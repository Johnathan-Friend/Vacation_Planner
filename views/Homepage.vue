<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
      <div class="text-center">
        <h1 class="title">I Want to Plan a Trip to...</h1>
        <h2 class="sub-title">Your ultimate vacation planner powered by AI.</h2>
        <div class="d-flext">
          <router-link to="/signin">
            <button type="button" class="btn btn-primary mr-2" id="sign-in">Sign In</button>
          </router-link>
          <router-link to="/register">
            <button type="button" class="btn btn-secondary" id="register">Register</button>
          </router-link>
      </div>
    </div>
    <div>
      <img class="landing" src="../.././images/landingPage.png">
    </div>
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
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
}

.text-center {
  margin-bottom: 20px;
  text-align: start !important;
}

.btn {
  margin-right: 10px;
}

.landing {
  width: 90%;
}

.title {
  font-size: calc(1.375rem + 3.25vw);
  font-weight: 700;
  padding-bottom: 10px;
}

.sub-title {
  font-size: calc(1.375rem + 0.5vw);
  padding-bottom: 20px;
  font-weight: 500;
  padding-right: 10px;
}
</style>
