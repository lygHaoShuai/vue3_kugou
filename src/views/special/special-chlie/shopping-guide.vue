<template>
  <div style="display: flex;justify-content: center">
    <div >
      <div class="item" :class="{active:colorStyle === index}"
           @click="switchPlaylist(index)" v-for="(item,index) in name"
           :key="index">{{ item }}</div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "shopping-Guide",
  setup() {
    const colorStyle = ref(0)
    const name = ref(['华语歌单','古风歌单','欧美歌单','流行歌单','影视原声','精品歌单'])

    return { colorStyle,name }
  },
  methods: {
    switchPlaylist(index) {
      this.colorStyle = index
      this.$emit('switchPlaylist',index)
    }
  }
}
</script>

<style lang="less">
.item {
  width: 200px;
  height: 30px;
  margin-top: 15px;
  display: flex;
  background-color: rgba(236,248,243,0.3);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  color: #bbbbbb;
}
.active {
  border: #00D0D9 1px solid;
  color: #00D0D9;
}
</style>
