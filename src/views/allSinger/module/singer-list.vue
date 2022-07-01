<template>
  <div>
    <div v-for="(item,index) in singerType" :class="{indexBackground:listIndex === index}"
         class="list-text" :style="{marginTop:(index === 0) ? 'unset' : ''}"
          @click="indexOf(index)">
      {{ item }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "singer-list",
  setup() {
    const singerType = ref(['热门歌手','华语歌手','欧美歌手','韩语歌手','日语歌手'])
    const listIndex = ref(0)
    return { singerType,listIndex }
  },
  methods: {
    indexOf(index) {
      if(this.listIndex !== index) {
        this.listIndex = index
        this.$emit('singer-list',index)
      }
    }
  }
}
</script>

<style lang="less">
.list-text {
  height: 32px;
  width: 208px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.list-text:hover {
  background-color: #C9EDFF;
  color: #ffffff;
  cursor: pointer;
}
.indexBackground {
  background-color: #C9EDFF;
  color: #ffffff;
}
</style>
