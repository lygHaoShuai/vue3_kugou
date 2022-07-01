<template>
  <div >
    <div style="background-color: #F4FBFE;height: 60px" />
    <div style="display: flex;justify-content: center;background-color: #F6F8FA">
      <div style="width: 1000px;display: flex;margin-top: 56px" >
        <div style="flex: 1;background-color: #FFFFFF;">
          <the-radio-program @classList="classList($event)" :count="count" style="float: right" />
        </div>
        <div style="flex: 3">
          <classification-of-radio @djCount="djCount($event)" :classListId="classListId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TheRadioProgram from './module/the-radio-program.vue'
import classificationOfRadio from './module/classification-of-radio.vue'
export default {
  name: "index",
  components: {
    TheRadioProgram,
    classificationOfRadio
  },
  setup() {
    const classListId = ref(3)
    const count = ref(0)
    // console.log(dj)
    return { classListId,count }
  },
  methods: {
    classList(vlaue) {
      this.classListId = vlaue
      console.log(vlaue)
    },
    djCount(count) {
      this.count = count
    }
  }
}
</script>

<style scoped>

</style>
