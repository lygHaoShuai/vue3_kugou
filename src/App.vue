
<template>
  <music-header />
  <ceiling-header  />
  <router-view />
</template>

<script>
import musicHeader from './components/music-header/index.vue'
import ceilingHeader from './components/ceiling-header/index.vue'
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    const isDel = ref(true)

    return { isDel }
  },
  components: {
    musicHeader,
    ceilingHeader
  },
  mounted() {
    window['listDataIndex'] = (val) => {
      this.$store.dispatch('cart/upList', val)
    }
  },
  methods: {
    playSong(item) {
      if(window.localStorage.getItem('music-count') === 'false' || window.localStorage.getItem('music-count') === null) {

        if(this.isDel) {
          this.$store.commit('cart/insertDel')
        }

        this.$store.dispatch('cart/insert',{id:item.id,songName:item.songName,name:item.name,time:item.time})
        let routePlay = this.$router.resolve(`/player/${item.id}`)
        window.open(routePlay.href, '_blank')
      } else {
        this.$store.dispatch('cart/insert',{id:item.id,songName:item.songName,name:item.name,time:item.time})
      }
    },
    playListAll(allList) {
      if(window.localStorage.getItem('music-count') === 'false' || window.localStorage.getItem('music-count') === null) {
        this.$store.commit('cart/insertDel')
        this.isDel = false
      }

      let listIndex = Object.keys(allList).reverse()
      listIndex.forEach((item,index) => {
        if((listIndex.length-index) !== 1) {
          this.$store.dispatch('cart/insert', {
            id: allList[item].id,
            songName: allList[item].songName,
            name: allList[item].name,
            time: allList[item].time
          })
        } else {
          this.playSong(allList[item])
        }
      })
    }
  }
}
</script>
