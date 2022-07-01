<template>
  <div style="display: flex;flex-wrap: wrap;justify-content: space-between">
    <div style="height: 180px;width: 176px"
         v-for="(item,index) in cities" :key="index">
      <div style="width: 100%;height: 100px">
        <el-image style="width: 100%;height: 100%" :src="item.cover" lazy />
      </div>
      <div class="mv-text" style="margin-top: 10px">{{ item.name }}</div>
      <div class="mv-text"
           style="color: #bbbbbb;margin-top: 5px;font-size: 13px">{{ item.artistName }}</div>
    </div>
  </div>
</template>

<script >
import {ref, watch} from 'vue'
import {search} from "../../../API/play";
export default {
  setup() {
    const cities = ref([])

    return { cities }
  },
  methods: {

    search(src) {
      search('/search',{keywords:src,type:1004}).then(data => {
        this.cities = data.result.mvs
      })
    }
  },
  mounted() {
    watch(() => this.$route.params.name,(newVal) => {
      this.search(newVal)
    },{immediate:true})
  }
}
</script>

<style lang="less">
.mv-text {
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
