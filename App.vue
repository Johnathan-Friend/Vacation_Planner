<template>
  <div id="app">
    <Navbar />
    <main>
        <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './components/Nav.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>

.btn {
  --bs-btn-font-weight: 500;
}

.btn-primary {
  --bs-btn-color: #fff;
  --bs-btn-bg: #49BF55;
  --bs-btn-border-color: #49BF55;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #43b14b;
  --bs-btn-hover-border-color : #43b14b;
  --bs-btn-focus-shadow-rgb: 49, 132, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #43b14b;
  --bs-btn-active-border-color: #43b14b;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #43b14b;
  --bs-btn-disabled-border-color: #43b14b;
}

.btn-secondary {
  --bs-btn-color: black;
  --bs-btn-bg: #6c757d00;
  --bs-btn-border-color: black;
  --bs-btn-hover-color: black;
  --bs-btn-hover-bg: #5c636a00;
  --bs-btn-hover-border-color: #565e64;
  --bs-btn-focus-shadow-rgb: 130, 138, 145;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #565e64;
  --bs-btn-active-border-color: #51585e;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #6c757d;
  --bs-btn-disabled-border-color: #6c757d;
}

.error-message {
  color: red;
}

.google-icon {
  margin-left: 5px;
}

.google-text {
  padding-top: 10px;
}

.input-box {
  padding-bottom: 10px;
}

.form-control {
  border: var(--bs-border-width) solid #000;
}
</style>
