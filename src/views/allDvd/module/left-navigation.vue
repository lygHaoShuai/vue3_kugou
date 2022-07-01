<template>
  <div>
    <div>
      <div class="list-header" style="">按语言</div>
      <div class="type">
        <div :class="{active:indexBorder === index}" @click="clickType(index)"
             v-for="(item,index) in type" :key="index">{{ item }}</div>
      </div>
    </div>
    <div>
      <div class="list-header">按时间</div>
      <div class="type">
        <div :class="{active:indexBorder === index + 4}" @click="clickTime(index)"
             v-for="(item,index) in time" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "left-navigation",
  setup() {
    const type = ref(['华语','欧美','日语','韩语'])
    const time = ref(['全部','最近七天','最近一月'])
    const indexBorder = ref(0)

    return { type,time,indexBorder }
  },
  methods: {
    clickType(index) {
      this.indexBorder = index
      this.$emit('type-list',index)
    },
    clickTime(index) {
      this.indexBorder = index + 4
      this.$emit('type-list',index + 4)
    }
  }
}
</script>

<style lang="less">
.list-header {
  height: 25px;
  width: 80%;
  align-items: center;
  color: #ffffff;
  background-color: #CFCFCF;
  display: flex;
  justify-content: center;
  border-radius: 12px;

}
.type {
  width: 80%;
  div:first-child {
    margin-top: 20px;
  }
  div {
    height: 35px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  div:hover {
    background-color: #85D2F2;
    color: #ffffff;
    cursor: pointer;
  }
}
.active {
  background-color: #85D2F2;
  color: #ffffff;
}
</style>
