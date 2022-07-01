<template>
  <song-list-header />
  <song-list :song-list-data="songListData" :song-hot="songHot" />

  <new-song-header @subtract="subtract()" @plus="plus()" />
  <new-song :MVdate="MVdate" :new-song-list-data="newSongListData" :end="end" :start="start" />
  <showDJ />
  <singer />
</template>

<script>
import songListHeader from './module/song-list-header.vue'
import songList from './module/song-list.vue'
import newSongHeader from './module/new-song-header.vue'
import newSong from './module/new-song.vue'
import showDJ from './module/show-dj.vue'
import singer from './module/singer.vue'
import { ref } from 'vue'

import {getSongList,getSongListAll,newSongList,recommendMV} from "../../API/play";
import store from "../../store";
export default {
  name: "index",
  components: {
    songListHeader, songList, newSongHeader, newSong, showDJ, singer
  },
  setup() {

    const songListData = ref([])
    const songHot = ref([])
    const newSongListData = ref([])
    const MVdate = ref([])
    const end = ref(8)
    const start = ref(0)



    return { songListData,songHot,newSongListData,MVdate,end,start }
  },
  created() {
    this.getSongList()
    this.getSongListAll()
    this.newSongList()
    this.recommendMV()

  },
  methods: {
    getSongList() {
        getSongList('/personalized').then(data => {
          this.songListData = data.result
        })
    },
    newSongList() {
        newSongList('/personalized/newsong', {limit: 30}).then(data => {
          this.newSongListData = data.result
        })
    },
    recommendMV() {
      recommendMV('/personalized/mv').then( data => {
        this.MVdate = data.result
      })
    },
    getSongListAll() {
      getSongListAll('/toplist/detail').then(data => {
        const song = ['飙升榜','新歌榜','热歌榜']
        data.list.map(item => {
          if(song.indexOf(item.name) !== -1) {
            this.songHot.push(item)
          }
        })
      })
    },
    subtract() {

      this.end -= 8
      this.start -= 8
    },
    plus() {

      this.end += 8
      this.start += 8
    }
  }
}
</script>

<style scoped>

</style>
