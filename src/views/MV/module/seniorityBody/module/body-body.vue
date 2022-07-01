<template>
  <div style="width: 100%;display: flex;height: 32px;">
    <div style="flex: 1">
      <div style="width: 80%">
        <div v-for="(item,index) in title" :key="index" class="hover-background" @click="selectMV(index)"
             :style="{ backgroundColor : ( titleIndex === index ? '#C9EDFF' : '')}">
          {{ item }}
        </div>
      </div>
    </div>
    <div style="flex: 3;position: relative">

        <div style="flex-wrap: wrap;display: flex;width: 770px;position: absolute">
          <div v-for="(item,index) in allListMV" :key="index" style="height: 104px;width: 138px;
          margin-right: 15px;margin-bottom: 10px;cursor: pointer">
            <div style="height: 80px;">
              <el-image @click="playMV(item.id)" style="height: 80px;width: 138px;border-radius: 15px;" :src="item.cover" lazy />
            </div>
            <div style="font-size: 12px;white-space: nowrap;margin-top: 2px;
            overflow-x: hidden;text-overflow: ellipsis">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {allMV} from "../../../../../API/play";
import { ref } from 'vue'
export default {
  name: "body-body",
  setup() {
    const allListMV = ref([])
    const title = ref(['新歌推荐','内地精选','港台精选','欧美精选','日本精选','韩语精选'])
    const titleTxt = ref(['','内地','','港台','欧美','日本','韩国'])
    const titleIndex = ref(0)
    return { allListMV,title,titleIndex,titleTxt }
  },
  created() {
    this.allDataMV()
  },
  props: {
    indexSong: Number
  },
  methods: {
    playMV(id) {
      let routePlay = this.$router.resolve(`/video/player/${id}`)
      window.open(routePlay.href, '_blank')

    },
    allDataMV() {
      allMV('/mv/all', {limit:20,offset:this.indexSong,area:this.titleTxt[this.titleIndex + 1]}).then(data => {
        this.allListMV = data.data
      })
    },
    selectMV(index) {
      this.titleIndex = index
      this.$emit('SongSelect',index)
      this.allDataMV()
    }
  },
  watch: {
    indexSong() {
      this.allDataMV()

    }
  }
}
</script>

<style lang="less">
.hover-background {
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  height: 36px
}
.hover-background:hover {
  background-color: #C9EDFF;
}
</style>
