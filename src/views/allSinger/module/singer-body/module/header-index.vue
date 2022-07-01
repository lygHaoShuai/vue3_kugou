<template>
  <div style="height: 35px;display: flex;border-bottom: 1px #B5B9BB solid">
    <div v-for="(item,index) in letter" :key="index">
      <span :class="{letterColor: letterColorIndex === index}"
            @click="indexOf({index,item})" class="header-letter"
            :style="{marginLeft:(index === 0) ? 'unset' : ''}">{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "header-index",
  setup() {
    const letter = ref(['全部','A','B','C','D','E','F','G','H','I','J','K','L',
      'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','其他'])
    const letterColorIndex = ref(0)

    return { letter,letterColorIndex }
  },
  props: {
    singerIndex: Number
  },
  methods: {
    indexOf(index) {
      this.letterColorIndex = index.index
      this.$emit('singer-fina',this.finalist(index.item))
    },
    finalist(item) {
      switch (item) {
        case '全部':
          return 'all'
        case '其他':
          return '#'
        default:
          return item
      }
    }
  },
  watch: {
    singerIndex() {
      this.letterColorIndex = 0
      this.$emit('singer-fina','all')
    }
  }
}
</script>

<style lang="less">
.header-letter {
  font-size: 14px;
  padding: 1px 7px;
  margin-left: 1px
}
.header-letter:hover {
  background-color: #C9EDFF;
  color: #ffffff;
  cursor: pointer;
}
.letterColor {
  background-color: #C9EDFF;
  color: #ffffff;
  cursor: pointer;
}
</style>
