<template>
  <div style="display: flex;justify-content: center">
    <el-pagination
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        layout="prev, pager, next"
        :current-page="currentPage"
        :total="100" />
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "bottom-count",
  setup() {
    const isHide = ref(false)
    const currentPage = ref(1)

    return { isHide,currentPage }
  },
  props: {
    typeIndex: Number
  },
  methods: {
    currentChange(e) {
      this.currentPage = e
      this.$emit('indexOf',e)
    },
    prevClick(e) {
      this.currentPage = e
      this.$emit('indexOf',e)
    },
    nextClick(e) {
      this.currentPage = e
      this.$emit('indexOf',e)
    }
  },
  watch: {
    length() {
      if( ((length*10)/18) <= 1 ) {
        this.isHide = true
      }
    },
    typeIndex() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>

</style>
