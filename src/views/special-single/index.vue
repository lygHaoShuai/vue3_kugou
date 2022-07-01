<template>
<div style="display: flex;justify-content: center;">
  <div style="width: 1000px;margin-top: 60px;display: flex;">
    <div style="flex: 1;border-right: #bbbbbb 1px solid;margin-top: 70px">
      <song-vitae />
    </div>


    <div style="flex: 3;padding: 0 31px;">
      <special-list />
    </div>

  </div>
</div>
</template>

<script>
import { getSongList, } from '../../API/play'
import songVitae from './special-chlie/song-vitae.vue'
import specialList from './special-chlie/special-list.vue'

import { ref } from 'vue'
export default {
  name: "index",
  setup() {
    return {  }
  },
  components: {
    songVitae,
    specialList
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="less">
.list-color {
  background-color: #C9EDFF;
  color: #FFFFFF;
}
.list:hover {
  background-color: #C9EDFF;
  color: #FFFFFF;
  cursor: pointer;
}
</style>
