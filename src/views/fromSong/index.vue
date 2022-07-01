<template>
<div style="display: flex;justify-content: center;">
  <div style="width: 1000px;margin-top: 60px;display: flex;">
    <div style="flex: 1.5;border: #bbbbbb 1px solid;">
      <shoppingGuide :class="{'list-color' : songListShow === index}" class="list"
                     v-for="(item,index) in listSong" @click="listShow(index)"
                     :key="index" :styleList="{name:item.name,coverImgUrl:item.coverImgUrl}"/>
    </div>


    <div v-if="estimate" style="flex: 3;padding: 0 31px;">
      <specialListItem :songIdStyle="songIdStyle[songListShow]" />
    </div>
    <div v-else style="flex: 3">
      请先登录
    </div>
  </div>
</div>
</template>

<script>
import {getSongList} from '../../API/play'
import shoppingGuide from './special-chlie/shopping-guide.vue'
import specialListItem from './special-chlie/special-list-item.vue'

import { ref } from 'vue'
export default {
  name: "index",
  setup() {
    const listSong = ref({})
    const songIdStyle = ref([])
    const songListShow = ref(0)

    const estimate = ref(true)


    return { listSong,estimate,songIdStyle,songListShow }
  },
  components: {
    shoppingGuide,
    specialListItem
  },
  created() {
    getSongList('/toplist/detail').then(data => {
      this.listSong = data.list
      this.listSong.map(item => {
        this.songIdStyle.push({id:item.id,name:item.name,updateTime:item.updateTime})
      })

    })

  },
  methods: {
    listShow(index) {
      this.songListShow = index
    }
  }
}
</script>

<style lang="less">
.list-color {
  background-color: #C9EDFF;
  color: #FFFFFF;
}
.list:hover {
  background-color: #C9EDFF;
  color: #FFFFFF;
  cursor: pointer;
}
</style>
