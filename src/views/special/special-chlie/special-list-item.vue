<template>
  <div>
  <div style="height:104px;display: flex;margin-left: 34px;
  align-items: center;border-bottom: 1px #bbbbbb solid">
    <div style="display:flex;width: 715px;height: 104px;">
      <div @click="singlePush(listData.id)"><img :src="listData.img" class="img-style"/></div>
      <div style="display: flex;align-items: center">
        <div class="list-font-border" style="margin-left: 12px;width: 600px">
          <div style="justify-content: space-between;display: flex;cursor: default">
            <span @click="singlePush(listData.id)" class="name-style" >{{ listData.name }}</span>
            <span style="font-size: 10px" >
              <span style="padding: 0 3px;color: #67C23A" v-for="(item,index) in listData.tags" :key="index">
                {{item}}
              </span>
            </span>
          </div>
          <div class="song-style-name">{{ listData.description }}</div>
          <div>
            <button class="play" type="button" @click="playListAll(listData.id)">播放全部</button>
            <button class="play" style="margin-left: 20px" type="button">分享</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {songPlayList} from "../../../API/play";

export default {
  name: "special-list-item",
  props: {
    listData: Object
  },
  methods: {
    singlePush(item) {
      this.$router.push(`/special/single/${item}`)
    },
    playListAll(id) {
      songPlayList('/playlist/track/all',
          {id:id, limit:20}).then(data => {
        let songAllList = {}
        data.songs.forEach((item,index) => {
          songAllList[index] = {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt}
        })
        this.$root.playListAll(songAllList)
      })
    }
  }
}
</script>

<style lang="less">
.el-button {
  span {
    margin: 0 20px;
    font-size: 12px;
    padding: 0 0;
  }
}
.img-style {
  height: 104px;
  width: 104px;
  border:5px solid  rgba(220,220,220,0.3);
  box-sizing: border-box;
  &:hover {
    border:5px solid  rgba(2,22,220,0.3);
  }
}
.list-font-border {
  .name-style {
    font-size: 15px;
    &:hover {
      color: #00D0D9;
    }
  }
  .song-style-name {
    font-size: 10px;
    color: #A699A6;
    display: -webkit-box;
    cursor: default;
    height: 30px;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
    &:hover {
      color: #00A9FF;
    }
  }
  div {
    margin: 6px 0;
  }
  .play {
    height: 28px;
    border: unset;
    background-color: #00A9FF;
    color: #FFFFFF;
    padding: 0 23px;
  }
}
</style>
