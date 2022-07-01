<template>
  <div class="music">
    <audio id="audio" @timeupdate="timeUpdate" :src="musicLocation" autoplay="autoplay">
      Your browser does not support the audio element.
    </audio>
    <player-page ref="playerChile" :listData="listData" :listIndex="listIndex"
                 :new-time="newTime" :list-show="listShow" @songStyle="songName($event)"
                 @listIndex="songIndex($event)" @isListShow="isListShow" />
    <player-bottom :list-length="listData.length" :singer-style="this.songStyle"
                   :new-time="newTime" :all-time="listData[this.listIndex].time"
                   :list-index="listIndex" :play="play"
                   @startEnd="startEnd" @progressBar="progressBar($event)"
                   @listShow="isListShow" @previous="previous" @next="next"/>
  </div>
</template>

<script>
import playerPage from './module/player-page.vue'
import playerBottom from './module/player-bottom.vue'
import { useStore } from 'vuex'
import {player} from '../../API/play'
import {ref, watch} from 'vue'

export default {
  name: "music",
  components: {
    playerPage,
    playerBottom
  },
  setup() {
    const musicLocation = ref('')
    const store = useStore()
    const newTime = ref(0)
    const allTime = ref(0)
    const songStyle = ref([])

    const listData = ref([])
    const listIndex = ref(0)
    const listShow = ref(false)

    const play = ref(false)
    const music = ref({})

    return { musicLocation,newTime,allTime,songStyle,
      listData,listIndex,listShow,
      play,store,music }
  },
  created() {
    this.timer = setInterval(() => {
      if(window.localStorage.getItem('music-list')) {
        window.localStorage.removeItem('music-list')
        this.$router.go(0)
      }
    }, 500);
    this.listData = this.store.getters['cart/listData']
    this.getMusicUrl()
  },
  mounted() {
    window.addEventListener('unload',e => this.unloadHandler(e))
    window.localStorage.setItem('music-count','true')

    this.audio = document.getElementById('audio')

    this.audio.addEventListener('ended', e => this.next(), false);

  },
  methods: {
    previous() {
      this.$refs.playerChile.songPlay(this.listIndex - 1,this.listData[this.listIndex - 1])
    },
    next() {
      this.$refs.playerChile.songPlay(this.listIndex + 1,this.listData[this.listIndex+1])
    },
    isListShow() {
      this.listShow = !this.listShow
    },
    unloadHandler() {
      window.localStorage.setItem('music-count','false')

    },
    //音乐地址
    getMusicUrl() {
      player('/song/url', {id: this.listData[this.listIndex].id}).then(data => {
        this.musicLocation = data.data[0].url
      })
    },
    songName(item) {
      this.songStyle = item
    },
    startEnd() {
      if(!this.audio.paused) {
        this.audio.pause()
        this.play = false
      } else {
        this.audio.play()
        this.play = true
      }
    },

    progressBar(time) {
      time = time * this.audio.duration
      this.audio.currentTime = time
    },

    timeUpdate(e) {
      this.newTime = Math.round(e.target.currentTime)
      this.play = !this.audio.paused
      if(e.target.duration > 0.01) {
        this.allTime = e.target.duration
      }
    },
    songIndex(index) {
      this.listIndex = index
    }
  },
  watch: {
    listIndex() {
      this.getMusicUrl()
    }
  }

}

</script>

<style lang="less">
.music {
  height: 542px;
  width: 100%;
  background-color: #1A1910;
}
</style>
