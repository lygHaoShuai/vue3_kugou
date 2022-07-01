<template>
  <div >
    <div style="height: 60px;background-color: #C9EDFF"></div>
    <seniority-new-mv  />
    <seniority-body style="margin-top: 20px" />
  </div>

</template>

<script>
import seniorityNewMv from './module/seniority-new-mv.vue'
import seniorityBody from './module/seniorityBody/index.vue'
export default {
  name: "index",
  components: {
    seniorityNewMv,
    seniorityBody
  }
}
</script>

<style scoped>

</style>
