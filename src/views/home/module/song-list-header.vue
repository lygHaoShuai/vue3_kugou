<template>
  <div class="list-border">
    <div class="list-move" >
      <div style="position: relative;">
        <span style="cursor: default">精选歌单</span>
        <span class="hover" @click="special">
          更多
          <el-icon style="position: absolute;margin-top: 2px" :size="18"><ArrowRight /></el-icon>
        </span>
      </div>
      <div style="position: relative;">
        <span style="cursor: default">热门榜单</span>
        <span class="hover" @click="fromSong">
          更多
          <el-icon style="position: absolute;margin-top: 2px" :size="18"><ArrowRight /></el-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
export default {
  name: "song-list-header",
  components: {
    ArrowRight
  },
  methods: {
    special() {
      this.$router.push('special')
    },
    fromSong() {
      this.$router.push('fromSong')
    }
  }
}
</script>

<style lang="less">
.list-border {
  height: 130px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  .list-move {
    width: 1000px;
    display: flex;
    align-items: center;
    .hover {
      cursor: pointer;
      margin-right: 30px;
    }
    .hover:hover {
      color: #00A9FF;
    }
    div:first-child {
      width: 640px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
    }
    div:last-child {
      width: 360px;
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
    }
    div {
      span:first-child {
        font-size: 30px;
      }
      span:last-child {
        color: #A7A7A7;
        margin-top: 12px;
      }
    }
  }
}
</style>
