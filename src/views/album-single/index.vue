<template>
  <div style="background-color: rgba(150,100,230,0.1);height: 60px;"/>
  <div class="singer-border">
    <div style="width: 1000px;display: flex">
      <div style="flex: 1.1">
        <div class="album" v-if="this.albumDate.name">
          <img :src="albumDate.blurPicUrl" style="height: 152px;width: 100%" />
          <div style="margin-top: 25px">
            <el-button style="width: 120px;height: 25px;font-size: 13px"
                       color="#7CDBFF" type="primary" plain>播放全部</el-button></div>
          <div><span style="color:#7D7D7D;">专辑名: &nbsp;</span><span>{{ this.albumDate.name }}</span></div>
          <div><span style="color:#7D7D7D;">歌手: &nbsp;</span><span>{{ this.albumDate.artist.name }}</span></div>
          <div><span style="color:#7D7D7D;">发行时间: &nbsp;</span><span>{{ this.time(this.albumDate.publishTime) }}</span></div>
          <div class="introduce">
            <span style="color:#7D7D7D;">简介: &nbsp;</span><span>{{ this.albumDate.description }}</span></div>
        </div>
      </div>
      <div style="flex: 5;border-left: 1px #bbbbbb solid">
        <div style="margin-left: 20px">
          <div style="font-weight: bold"><span>{{'<'}}{{ this.albumDate.name }} {{'>'}}  </span>&nbsp; - &nbsp;<span>歌曲列表</span></div>
          <div>
            <div style="height: 59px;display: flex;align-items: center;
            font-size: 14px;border-bottom: 1px #bbbbbb solid;">

              <input type="checkbox" style="height: 15px;width: 15px"
                     v-model="checkAll" @click="AllChange" />
              <div style="margin-left: 10px;color: #999999">
                全选
              </div>
              <div style="width: 90%;">
                <el-button style="height: 25px;font-size: 13px;float: right" @click="playAllList"
                           color="#7CDBFF" type="primary" plain>播放全部</el-button>
                <el-button style="height: 25px;font-size: 13px;float: right;margin-right: 15px"
                           color="#7CDBFF" type="primary" plain @click="allListPlay">播放</el-button>
              </div>
            </div>
            <div class="album-border" v-if="songs.length >= 1"
                 v-for="(item,index) in songs" :key="index" >
              <input type="checkbox" :id=" 'special' + `${index}` "
                     @click="checkChange(item,index)" style="height: 15px;width: 15px" />
              <div style="padding: 0 6px;" ><span v-if="index+1 <= 9">0</span>{{ index + 1 }}</div>
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div style="margin-top: 60px;font-weight: bold;height: 30px;
          border-bottom: 1px #bbbbbb solid" >其他专辑</div>

          <div v-if="albumElse.length >= 1"
              style="display: flex;width: 580px;justify-content: space-between;margin-top: 15px;margin-left: 12px">
            <div v-for="(item,index) in albumElse" :key="index" >
              <img :src="item.blurPicUrl" @click="albumPush(item.id)"
                   style="height: 115px;width: 115px;background-color: #bbbbbb" />
              <div style="display: flex;justify-content: center;width: 115px;">
                <div style="white-space: nowrap;overflow-x: hidden;text-overflow: ellipsis;font-size: 12px">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { singerAlbum,album } from "../../API/play";
import {ref, watch} from 'vue'
export default {
  name: "index",
  setup() {
    const albumDate = ref({})
    const albumElse = ref([])
    const songs = ref({})
    const allList = ref({})
    const playAll = ref({})
    const checkAll = ref(false)
    const checkItem = ref(0)

    return { albumDate,albumElse,songs,allList,playAll,checkAll,checkItem }
  },
  created() {
    watch(() => this.$route.params.albumId,(newVal) => {
      if(this.$route.params.albumId) {
        this.singerAlbum(newVal)
        window.scrollTo(0,0)
        this.checkAll = false
        this.allList = {}
        this.playAll = {}
      }
    },{immediate:true})

  },
  methods: {
    playAllList() {
      this.$root.playListAll(this.playAll)
    },
    allListPlay() {
      this.$root.playListAll(this.allList)
    },
    singerAlbum(id) {
      album('/album',{id:id}).then(data => {
        this.albumDate = data.album
        this.songs = data.songs
        this.singerAlbumElse(this.albumDate.artist.id)
        const time = setTimeout(() => {
          this.AllChange()
        },100)
      })
    },
    singerAlbumElse(id) {
      singerAlbum('/artist/album',{id:id,limit:5}).then(data => {
        data.hotAlbums.forEach((item,index) => {
          if(item.id!==this.$route.params.albumId) {
            if(this.albumElse.length <= 3) {
              this.albumElse[index] = item
            }
          }
        })
      })

    },
    albumPush(id) {
      this.$router.push(`/album/single/${id}`)
    },
    time(upTime) {
      const time = new Date(upTime)
      const year = time.getFullYear()
      const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1): (time.getMonth() + 1)
      const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      upTime = `${year}-${month}-${date}`

      return upTime
    },
    AllChange()  {
      this.checkAll = !this.checkAll
      this.songs.forEach((item,index) => {
        const check =document.getElementById(`special${index}`)
        if(this.checkAll) {
          check.checked = true
          this.checkItem = this.songs.length
          this.allList[index] = {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt}
          this.playAll[index] = {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt}
        } else {
          check.checked = false
          this.checkItem = 0
          delete this.allList[index]
        }
      })
    },
    checkChange(item,index) {
      const check =document.getElementById(`special${index}`)
      if(check.checked) {
        this.checkItem ++
        this.allList[index] = {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt}
      } else {
        this.checkItem --
        delete this.allList[index]
      }

      if(this.checkItem ===this.songs.length ) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    }
  }
}
</script>

<style lang="less">
.singer-border {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .album-border {
    display: flex;
    height: 35px;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
  }
  .album {
    width: 152px;
    font-size: 13px;
    .introduce {
      margin-top: 30px;
      height: 200px;
      overflow-y: scroll;
      cursor: default;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    div {
      margin-top: 9px;
    }
  }
}
</style>
