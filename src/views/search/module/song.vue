<template>
  <div style="height: 59px;background-color: #F8F8F8;
  display: flex;align-items: center;font-size: 14px">

    <div style="margin-left: 10px;display: flex;color: #999999">
      <div style="width: 520px">歌单名</div>
      <div style="width: 389px">创建人</div>
      <div style="width: 56px">播放次数</div>
    </div>

  </div>

  <div class="song-border" v-for="(item,index) in cities" :key="index">
    <div style="height: 45px;width: 45px;background-color: #00A9FF">
      <el-image style="width: 100%;height: 100%" :src="item.coverImgUrl" lazy />
    </div>
    <div class="song-style">
      <div class="nameTex" style="width: 500px">{{ item.name }}</div>
      <div class="nameTex" style="width: 389px">{{ item.creator.nickname }}</div>
      <div style="width: 56px;cursor: default">{{ this.playCount(item.playCount) }}</div>
    </div>

  </div>

</template>

<script >
import {ref, watch} from 'vue'
import {search} from "../../../API/play";
export default {
  setup() {
    const cities = ref([])

    return { cities }
  },
  methods: {

    search(src) {
      search('/search',{keywords:src,type:1000}).then(data => {
        this.cities = data.result.playlists

      })
    },
    playCount(count) {
      return (count / 10000).toFixed(0) > 0 ? (count / 10000).toFixed(0) + '万' : count
    }
  },
  mounted() {
    watch(() => this.$route.params.name,(newVal) => {
      this.search(newVal)
    },{immediate:true})
  }
}
</script>

<style lang="less">
.song-border {
  display: flex;
  height: 59px;
  align-items: center;
  font-size: 14px;
  .song-style {
    margin-left: 10px;
    display: flex;

    div {
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nameTex:hover {
      color: #00A9FF;
      cursor: pointer;
    }
  }
}
.song-border:hover {
  background-color: #F8F8F8;
}
</style>
