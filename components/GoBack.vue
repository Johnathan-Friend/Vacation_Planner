<template>
    <span>
        <button @click="goBack" class="btn btn-secondary">Back</button>
    </span>
</template>

<script>
export default {
  methods: {
    goBack () {
      return this.$router.go(-1)
    }
  }
}
</script>

//needs to be fixed to go back step by step
