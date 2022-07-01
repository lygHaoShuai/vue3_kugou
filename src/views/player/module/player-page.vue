<template>
  <div style="height: 542px;">
    <div class="page-ares" v-if="singerStyle.ar && singerStyle.al">
      <div class="img-ares" >
        <img :src="singerStyle.al.picUrl" />
      </div>
      <div class="lyric-ares">
        <div style="margin-left: 48px;">
          <div class="song-list">{{singerStyle.name}}</div>
          <div style="display: flex;margin-top: 20px">
            <div class="album">
              <span>专辑: </span>
              <span>{{ singerStyle.al.name }}</span>
            </div>
            <div style="margin-left: 20px" class="album">
              <span>歌手:</span>
              <span>{{ singerStyle.ar[0].name }}</span>
            </div>
          </div>
          <div id="scroll" class="lyric-border">
              <div class="lyric">
                <div :class="{active:this.indexMusic === index}" class="lyric-list" v-for="(item,index) in timeKey" :key="index">
                  {{ this.musicLyric[item] }}
                </div>
              </div>
          </div>
        </div>
        <div :class="{songListPlay:!listShow}" class="song-list-play">
          <div style="height: 48px;display: flex;justify-content: space-between;align-items: center">
            <div style="width: 100px;display: flex;justify-content: center">播放队列/</div>
            <div style="width: 60px;display: flex;align-items: center;
            justify-content: space-between;margin: 0 20px 7px 0">
              <span @click="isListShow">
                <el-icon style="cursor: pointer" :size="17" color='#ffffff'>
                  <Close />
                </el-icon>
              </span>
                <span>|</span>
                <span>
                <el-icon :size="15" color='#ffffff'>
                  <Delete />
                </el-icon>
              </span>
            </div>
          </div>
          <div id="listScrollTop" class="list-border" >
            <div style="cursor: pointer" v-for="(item,index) in listData"
                 :key="index" @click="songPlay(index,item)"
                 :class="{active:listIndex === index}" class="song-list-style">
              <div style="width: 60px;display: flex;justify-content: center">{{ index + 1 }}</div>
              <div :class="{activeName:listIndex === index}"
                   style="width: 220px;font-size: 14px;color: #D3D3D3;">{{ item.songName }}</div>
              <div style="width: 120px;font-size: 14px">{{ item.name }}</div>
              <div style="width: 50px">{{ (item.time / 1000 / 60).toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {player} from "../../../API/play";
import { Close,Delete } from '@element-plus/icons-vue'
export default {
  name: "player- page",
  setup() {
    const musicLyric = ref({})
    const timeKey = ref([])
    const singerStyle = ref({})
    const indexMusic = ref(0)

    return { musicLyric,timeKey,singerStyle,indexMusic }
  },
  components: {
    Close,Delete
  },
  created() {
    this.getMusicLyric()
    this.getMusicSong()
  },
  props: {
    newTime: Number,
    listData: Object,
    listIndex: Number,
    listShow: Boolean
  },
  methods: {
    isListShow() {
      this.$emit('isListShow')
    },
    //歌词地址
    getMusicLyric() {
      player('/lyric', {id: `${this.listData[this.listIndex].id}`}).then(data => {
        const lyric = /\[([^\]]+)\]([^\[]+)/g;
        data.lrc.lyric.replace(lyric, (all, time, lyric) => {
          const newTime = time.split(':')
          let Time = Number(newTime[0] * 60 + Number(newTime[1]))
          Time = Math.floor(Time)
          lyric = lyric.substring(0,lyric.length-1)

          if(lyric.length >= 1) {
            this.musicLyric[Time] = lyric
          }
        })
        this.timeKey = Object.keys(this.musicLyric)
      })
    },
    //音乐详情
    getMusicSong(){
      player('/song/detail', {ids: `${this.listData[this.listIndex].id}`}).then(data => {
        this.singerStyle = data.songs[0]
        this.$emit('songStyle',{img:this.singerStyle.al.picUrl,name:this.singerStyle.ar[0].name})
      })
    },
    songPlay(index,item) {
      window.opener.listDataIndex(JSON.stringify(item))
      this.$emit('listIndex', index)
    }
  },
  watch: {
    newTime() {
      if(this.musicLyric[this.newTime]) {

        this.indexMusic = this.timeKey.indexOf(`${this.newTime}`)
        document.getElementById('scroll').scrollTop = this.indexMusic *30
      }
    },
    listIndex() {
      this.getMusicLyric()
      this.getMusicSong()
      document.getElementById('listScrollTop').scrollTop = this.listIndex *38
      window.opener.listDataIndex(JSON.stringify(this.listData[this.listIndex]))
    }
  }
}

</script>

<style lang="less">
.page-ares {
  display:flex;
  z-index: 1000;
  .img-ares {
    flex: 1;
    display: flex;
    justify-content: center;
    img {
      height: 263px;
      width: 263px;
      margin-top: 85px;
      opacity: 0.5;
    }
  }
  .lyric-ares {
    flex: 1;
    position: relative;
    .songListPlay {
      position: fixed !important;
      margin: 0 0 0 1000px !important;
    }
    .song-list-play {
      position: absolute;
      height: 400px;
      width: 480px;
      background-color: #2F343B;
      margin: -334px 0 0 19px;
      .list-border {
        padding: 0 15px;
        height: 352px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .song-list-style {
          height: 40px;
          display: flex;
          align-items: center;

          div {
            color: #77777E;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
          }
        }

        .song-list-style:hover {
          background-color: rgba(64, 68, 75, 0.5);
        }

        .active {
          background-color: #40444B !important;

          .activeName {
            color: #00A9FF !important;
          }
        }
      }
    }
    .song-list {
      margin-top: 85px;
      color: #FFFFFF;
      font-size: 22px;
    }

    .album {
      width: 180px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
      span:first-child {
        color: #B5B9BB;
      }
      span:last-child {
        color: #FFFFFF;
        margin-left: 10px;

      }
    }
    .lyric-border {
      margin-top: 20px;
      width: 400px;
      height: 300px;
      overflow-y:scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .lyric {
        margin-top: 110px;
        .active {
          color: #00A9FF !important;
        }
        .lyric-list {
          margin-top: 10px;
          color: #B5B9BB;
        }
      }
    }
  }
}
.el-icon {
  margin-top: 7px;
}
</style>
