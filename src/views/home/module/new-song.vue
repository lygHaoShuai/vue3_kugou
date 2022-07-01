<template>
  <div style="height: 373px;">
  <div class="new-song-border" >
    <div class="new-song-move">
      <div class="song" >
        <div v-if="end >=8 " class="hover-text" style="width: 305px;height: 90px;"
             v-for="(item,index) in newSongListData.slice(start,end)"
             :key="index">
          <div v-if="item.name&&item.song.hMusic" style="height: 70px;display: flex;
          position: relative;cursor: pointer;"  >
            <div style="display: flex" @click="newPlay(item)">
              <div style="height: 70px;width: 70px;overflow: hidden">
                <img class="song-img" style="height: 100%;width: 100%" :src="item.picUrl" >
              </div>
              <div style="position: absolute;margin: 16px 0 0 102px">
                <div style="width: 120px;white-space: nowrap;overflow-x: hidden;text-overflow: ellipsis;">{{ item.name }}</div>
                <div style="color: #949494;font-size: 12px;margin-top: 10px">{{ item.song.artists[0].name }}</div>
              </div>
            </div>
            <div style="display: flex;flex-wrap: wrap;position: absolute;margin: 20px 0 0 232px;">
              <img style="width: 25px" src="../../../assets/icon_play_style2_black.png" />
              <img style="width: 25px" src="../../../assets/icon_download_style2_black.png" />
              <div style="color: #949494;font-size: 15px;">{{ ((item.song.hMusic.playTime/1000)/60).toFixed(2) }}</div>
            </div>
          </div>
        </div>

      </div>
      <div class="list-mv">
        <div v-if="MVdate[0]">
          <div class="particularly-img" @click="playMV(MVdate[0].id)">
            <img id="mvImg" @mousemove="overspreadShow()" @mouseleave="overspreadHidden()" :src="MVdate[0].picUrl">
            <div v-if="isOverspread" @mousemove="overspreadShow()" @mouseleave="overspreadHidden()" class="overspread"></div>
          </div>
          <div style="margin-top: 2px;font-size: 12px;">{{MVdate[0].name}}</div>
          <div style="margin-top: 2px;color:#8A8A8A;font-size: 10px;">{{MVdate[0].artists[0].name}}</div>
        </div>
        <div v-if="MVdate" class="cong-assist">
          <div class="assist-border" v-for="(item,index) in MVdate.slice(1,3)" :key="index"  >

              <div class="assist-img" @click="playMV(item.id)">
                <img :id=" 'mvAssistImg' + index"  @mousemove="assistOverspreadShow(index)" @mouseleave="assistOverspreadHidden(index)" :src="item.picUrl">
                <div v-if="this.isAssistOverspread === index" @mousemove="assistOverspreadShow(index)" @mouseleave="assistOverspreadHidden(index)" class="assist-overspread"></div>
              </div>
              <div style="width: 160px;white-space: nowrap;overflow-x: hidden;text-overflow: ellipsis" >{{ item.name }}</div>
              <div style="margin-top: -28px;color:#8A8A8A;font-size: 12px;">{{item.artists[0].name}}</div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "song-list",
  setup() {
    const isOverspread = ref(false)
    const isAssistOverspread = ref(null)
    const isListImg = ref(null)
    return { isOverspread,isAssistOverspread,isListImg }
  },
  props: {
    newSongListData: {
      type: Object,
      default: ''
    },
    MVdate: {
      type: Object,
      default: ''
    },
    end: Number,
    start: Number
  },
  methods: {
    playMV(id) {
      let routePlay = this.$router.resolve(`/video/player/${id}`)
      window.open(routePlay.href, '_blank')
    },
    overspreadShow() {
      this.isOverspread = true
      const songImg = document.getElementById('mvImg')
      songImg.style.cssText = 'transform:scale(1.2,1.2);'
    },
    overspreadHidden() {
      this.isOverspread = false
      const songImg = document.getElementById('mvImg')
      songImg.style.cssText = 'transform:scale(1,1);'
    },

    assistOverspreadShow(index) {
      this.isAssistOverspread = index
      const songImg = document.getElementById('mvAssistImg' + index)
      songImg.style.cssText = 'transform:scale(1.2,1.2);'
    },
    assistOverspreadHidden(index) {
      this.isAssistOverspread = null
      const songImg = document.getElementById('mvAssistImg' + index)
      songImg.style.cssText = 'transform:scale(1,1);'
    },
    newPlay(item) {
      this.$root.playSong({id:item.id,songName:item.name,name:item.alg,time:item.song.duration})
    }
  }
}
</script>

<style lang="less">
.new-song-border {
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  .new-song-move {
    width: 1000px;
    display: flex;
    .song {
      width: 640px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      margin-top: 10px;
      flex-wrap: wrap;
      .hover-text:hover {
        color: #00A9FF;
        .song-img {
          transform:scale(1.2,1.2);
        }
      }
    }
    .list-mv {
      width: 360px;
      justify-content: space-between;
      padding-left: 20px;
      .particularly-img {
        width: 100%;
        height: 200px;
        position: relative;
        overflow: hidden;
        border-radius: 5%;
        img {
          width: 100%;
          height: 100%;
          cursor:pointer;
        }
        .overspread {
          background: rgba(37,42,47,0.3) url("../../../assets/icon_play_white.png") center no-repeat;
          background-size: 66px;
          width: 100%;
          height: 200px;
          position: absolute;
          margin-top: -204px;
          cursor:pointer;
        }

      }
      .cong-assist {
        display: flex;
        justify-content: space-between;
        margin-top: 2px;
        .assist-border {
          width: 153px;
          height: 80px;

            .assist-img {
              width: 160px;
              height: 80px;
              overflow: hidden;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                cursor:pointer;
              }
              .assist-overspread {
                background: rgba(37,42,47,0.3) url("../../../assets/icon_play_white.png") center no-repeat;
                background-size: 45px;
                width: 160px;
                height: 80px;
                position: absolute;
                margin-top: -83px;
                cursor:pointer;
              }
            }

            div {
              width: 100%;
              height: 48px;
              overflow-y: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              font-size: 13px;
              margin-top: 5px;
            }

        }
      }
    }

  }
}
</style>
