<template>
  <el-pagination
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="(((length*10)/18))"
      :hide-on-single-page="isHide" />
</template>

<script>
import { ref } from 'vue'
export default {
  name: "pagination",
  setup() {
    const isHide = ref(false)
    const currentPage = ref(1)

    return { isHide,currentPage }
  },
  props: {
    length: Number,
    singerIndex: {Number,String}
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
    singerIndex() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>

</style>
