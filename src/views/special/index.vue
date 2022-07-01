<template>
<div style="display: flex;justify-content: center;position: relative">
  <div style="width: 1000px;margin-top: 60px;display: flex;position: relative">
    <div style="flex: 1" />
    <div style="flex: 1;" :style="{marginTop: is ? `${headerFixed}px` : '50px'}"
         class="issFixed">
      <shopping-guide @switchPlaylist = switchPlaylist($event) />
    </div>

    <div  style="flex: 3">
      <special-list-item
          :list-data="{ img:item.coverImgUrl,name:item.name,description:
        item.description,tags:item.tags,id:item.id }"
          v-for="(item,index) in listSong" :key="index" />
    </div>

  </div>
</div>
</template>

<script>
import { special } from '../../API/play'
import shoppingGuide from './special-chlie/shopping-guide.vue'
import specialListItem from './special-chlie/special-list-item.vue'

import { ref } from 'vue'
export default {
  name: "index",
  setup() {
    const listSong = ref({})
    const name = ref(['华语','古风','欧美','流行','影视原声'])
    const is = ref(true)
    const estimate = ref(true)
    const listUreSwitch = ref(0)
    const headerFixed = ref(0)

    return { listSong,name,headerFixed,listUreSwitch,is,estimate }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll',this.handleScroll)
    })
  },
  created() {
    this.special()
  },
  methods: {
    handleScroll() {
      const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
      this.headerFixed = scrollTop.toFixed(1)
    },
    switchPlaylist (index) {
      this.listUreSwitch = index
      window.scrollTo(0,0)
    },
    special() {
      if(this.listUreSwitch <= 4) {
        special(`/top/playlist?cat=${this.name[this.listUreSwitch]}&limit=30`).then(data => {
          this.listSong = data.playlists
        })
      } else {
        special('/top/playlist/highquality',
            {limit:30}).then(data => {
          this.listSong = data.playlists
        })
      }
    }
  },
  watch: {
    listUreSwitch() {
      this.special()
    }
  },
  components: {
    shoppingGuide,
    specialListItem
  }
}
</script>

<style scoped>
.issFixed {
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  z-index: 4;

}
</style>
