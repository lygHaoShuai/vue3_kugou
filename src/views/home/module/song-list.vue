<template>
  <div class="song-border" >
    <div class="song-move">
      <div class="song"  >
        <div v-if="songListData[0]" class="cong-particularly">
          <div class="particularly-img" @click="playListAll(songListData[0])">
            <img id="songImg" @mousemove="overspreadShow()" @mouseleave="overspreadHidden()"
                 :src="songListData[0].picUrl" >
            <div v-if="isOverspread" @mousemove="overspreadShow()" @mouseleave="overspreadHidden()" class="overspread"></div>
          </div>
          <div class="particularly-text" @click="singlePush(songListData[0])">{{songListData[0].name}}</div>
        </div>
        <div v-if="songListData" class="cong-assist">
          <div class="assist-border"  v-for="(item,index) in songListData.slice(1,5)" :key="index">
            <div class="assist-style">
              <div class="assist-img" @click="playListAll(item)">
                <img :id=" 'assistImg' + index"  @mousemove="assistOverspreadShow(index)"
                     @mouseleave="assistOverspreadHidden(index)" :src="item.picUrl">
                <div v-if="(isAssistOverspread === index)" @mousemove="assistOverspreadShow(index)"
                     @mouseleave="assistOverspreadHidden(index)" class="assist-overspread"></div>
              </div>
              <div class="assist-text" @click="singlePush(item)">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-for">
        <div style="height: 126px;" v-for="(item,index) in songHot" :key="index" >
            <div class="list-border">
              <div class="list-img" @click="playListAll(item)" >
                <img class="listImg" :src="item.coverImgUrl" alt="">
              </div>

              <div class="content">
                <div :class=" 'color' +index " class="saying-text"
                     v-for="(itemChile,indexChile) in item.tracks" :key="indexChile">

                  {{indexChile + 1}}
                  .&nbsp;
                  {{itemChile.first}}
                  -
                  {{itemChile.second}}

                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {songPlayList} from "../../../API/play";
export default {
  name: "song-list",
  setup() {
    const isOverspread = ref(false)
    const isAssistOverspread = ref(null)
    const isListImg = ref(null)

    return { isOverspread,isAssistOverspread,isListImg }
  },
  props: {
    songListData: Object,
    songHot: Object
  },
  methods: {
    playListAll(item) {
      songPlayList('/playlist/track/all',
          {id:item.id, limit:20}).then(data => {
        let songAllList = {}
        data.songs.forEach((item,index) => {
          songAllList[index] = {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt}
        })
        this.$root.playListAll(songAllList)
      })
    },

    singlePush(item) {
      this.$router.push(`/special/single/${item.id}`)
    },
    overspreadShow() {
      this.isOverspread = true
      const songImg = document.getElementById('songImg')
      songImg.style.cssText = 'transform:scale(1.2,1.2);'
    },
    overspreadHidden() {
      this.isOverspread = false
      const songImg = document.getElementById('songImg')
      songImg.style.cssText = 'transform:scale(1,1);'
    },

    assistOverspreadShow(index) {
      this.isAssistOverspread = index
      const songImg = document.getElementById('assistImg' + index)
      songImg.style.cssText = 'transform:scale(1.2,1.2);'
    },
    assistOverspreadHidden(index) {
      this.isAssistOverspread = null
      const songImg = document.getElementById('assistImg' + index)
      songImg.style.cssText = 'transform:scale(1,1);'
    }
  }
}
</script>

<style lang="less">
.song-border {
  height: 373px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  .song-move {
    width: 1000px;
    display: flex;
    .song {
      width: 640px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      .cong-particularly {
        display: block;
        flex: 1;

        .particularly-img {
          width: 305px;
          height: 320px;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            cursor:pointer;
          }
          .overspread {
            background: rgba(37,42,47,0.3) url("../../../assets/icon_play_white.png") center no-repeat;
            background-size: 88px;
            width: 305px;
            height: 320px;
            position: absolute;
            margin: -324px 0 0 0px;
            cursor:pointer;
          }
        }
        .particularly-text {
          margin-top: 10px;
          font-size: 15px;
          &:hover {
            color: #00A9FF;
            cursor: pointer;
          }
        }
      }
      .cong-assist {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .assist-border {
          width: 153px;
          height: 186px;
          .assist-style {
            width: 128px;
            height: 186px;
            margin-left: 25px;
            .assist-text {
              &:hover {
                color: #00A9FF;
                cursor: pointer;
              }
            }
            .assist-img {
              width: 128px;
              height: 128px;
              overflow: hidden;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                cursor:pointer;
              }
              .assist-overspread {
                background: rgba(37,42,47,0.3) url("../../../assets/icon_play_white.png") center no-repeat;
                background-size: 60px;
                width: 128px;
                height: 128px;
                position: absolute;
                margin: -131px 0 0 0px;
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
    .list-for {
      width: 360px;
      justify-content: space-between;
      padding-left: 20px;
        .list-border {
          height: 112px;
          display: flex;
          position: relative;
          .list-img {
            overflow: hidden;
            height: 112px;
            width: 112px;
            margin-right: 232px;
            .listImg {
              height: 100%;
              width: 100%;
              cursor: pointer;
              &:hover {
                transform:scale(1.2,1.2);
              }
            }
          }
          .content {
            margin-left: 130px;
            position: absolute;
            width: 209px;
            margin-top: 10px;
            .saying-text {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding: 5px 0;
            }
            .color0 {
              color: #E881AE;
            }
            .color1 {
              color: #7AD3C4;
            }
            .color2 {
              color: #E46E62;
            }
          }
        }

    }
  }
}
</style>
