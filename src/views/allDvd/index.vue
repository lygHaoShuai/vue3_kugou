<template>
  <div style="background-color: rgba(239,167,198,0.3);height: 60px;"/>
  <div style="display: flex;justify-content: center;margin-top: 30px">
    <div style="width: 1000px;display: flex;">
      <div style="flex: 1;">
        <left-navigation @type-list="typeList($event)" />
      </div>
      <div style="flex: 3;">
        <right-song :typeIndex="typeIndex" />
      </div>
    </div>
  </div>
</template>

<script>
import {allDVD} from "../../API/play";
import leftNavigation from './module/left-navigation.vue'
import rightSong from './module/right-song.vue'
import {ref} from "vue";
export default {
  name: "index",
  components: {
    leftNavigation,
    rightSong
  },
  setup() {
    const typeIndex = ref(0)

    return { typeIndex }
  },
  methods: {
    typeList(index) {
      this.typeIndex = index
    }
  }
}
</script>

<style scoped>

</style>
