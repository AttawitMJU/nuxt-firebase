<template>
  <div>
      {{project}}
  </div>
</template>

<script>
export default {
data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
</script>

<style>

</style>