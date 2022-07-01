<template>
  <div >
    <div style="background-color: #F4FBFE;height: 60px" />
    <div style="display: flex;justify-content: center;">
      <div style="width: 1000px;display: flex;margin-top: 16px" >
        <div style="flex: 0.85">
          <singer-list @singer-list="singerList($event)" />
        </div>
        <div style="flex: 3">
          <singerBody :singerIndex="singerIndex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import singerList from './module/singer-list.vue'
import singerBody from './module/singer-body/index.vue'
import { ref } from 'vue'
export default {
  name: "index",
  setup() {
    const singerIndex = ref(0)
    return { singerIndex }
  },
  components: {
    singerList,
    singerBody
  },
  methods: {
    singerList(index) {
      this.singerIndex = index
    }
  }
}
</script>

<style scoped>

</style>
