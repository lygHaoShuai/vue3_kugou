<template>
  <div style="border-left: 1px #bbbbbb solid">
    <div style="margin-left: 12px">
      <header-index :singerIndex="singerIndex" @singer-fina="singerFina($event)" />
      <div style="height: 30px;display: flex;align-items: center">
        <span style="color: #999999;font-size: 12px;">一下随机分配，不分先后</span>
      </div>
      <body-img @listLength="listLength($event)" ref="singerImg"
                :finalist="finalist" :start="start" :end="end" />
      <div style="display: flex;justify-content: center;">
        <pagination @indexOf="indexOf($event)" :length="length"
                    :singerIndex="index" style="margin-top: 20px"/>
      </div>
    </div>
  </div>
</template>

<script>
import headerIndex from './module/header-index.vue'
import bodyImg from './module/body-img.vue'
import pagination from './module/pagination.vue'
import { ref } from 'vue'
export default {
  name: "index",
  setup() {
    const finalist = ref('all')
    const length = ref(100)
    const start = ref(0)
    const end =ref(18)

    const index = ref(0)

    return { finalist,length,start,end,index }
  },
  props: {
    singerIndex: Number
  },
  components: {
    headerIndex,
    bodyImg,
    pagination
  },
  methods: {
    singerFina(index) {
      this.finalist = index
      this.index = index
      this.start = 0
      this.end = 18
    },
    listLength(length) {
      this.length = length
    },
    indexOf(index) {
      this.start = (index - 1) * 18
      this.end = index * 18
    }
  },
  watch: {
    singerIndex() {
      this.$refs.singerImg.singerHot(this.singerIndex)
      this.length = 100
      this.index = this.singerIndex
      this.start = 0
      this.end = 18
    }
  }
}
</script>

<style scoped>

</style>
