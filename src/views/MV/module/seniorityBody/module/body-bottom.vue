<template>
  <div class="block" >
    <el-pagination @current-change="currentChange"
                   @prev-click="prevClick"
                   @next-click="nextClick"
                   :current-page="currentPage"
                   layout="prev, pager, next"
                   :total="300" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "body-bottom",
  setup() {
    const currentPage = ref(1)
    return { currentPage }
  },
  props: {
    songSelect: Number
  },
  watch: {
    songSelect() {
      this.currentPage = 1
      this.$emit('countSong',0)
    }
  },
  methods: {
    currentChange(e) {
      this.$emit('countSong',e)
      this.currentPage = e
    },
    prevClick(e) {
      this.$emit('countSong',e)
      this.currentPage = e
    },
    nextClick(e) {
      this.$emit('countSong',e)
      this.currentPage = e
    }
  }
}
</script>

<style lang="less">

.block {
  .el-pagination {
    padding-left: 360px;
  }
}
</style>
