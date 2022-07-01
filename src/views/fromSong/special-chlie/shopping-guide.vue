<template>
  <div style="height: 30px;display: flex;align-items: center;padding-left: 25px">
    <div >
<!--      <img style="width: 16px;height: 16px" :src="styleList.coverImgUrl">-->
      <el-image style="width: 16px;height: 16px" :src="styleList.coverImgUrl" lazy />
    </div>
    <div style="padding-left: 15px;white-space: nowrap; text-overflow:ellipsis;">{{ styleList.name }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "shopping-Guide",
  setup() {
    const colorStyle = ref(0)


    return { colorStyle }
  },
  props: {
    styleList: Object
  }
}
</script>

<style lang="less">

</style>
