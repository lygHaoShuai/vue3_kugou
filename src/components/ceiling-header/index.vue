<template>
  <div style="position: relative">
    <div class="ceiling-border">
      <div v-for="(item,index) in textPath"
           :key="index" @click="pathHeader({item:item.path,index:index})"
           :class="{hoverColor:textIndex === index && this.$route.path===item.path}">{{ item.name }}</div>
    </div>

    <div>
      <carousel v-if="this.$route.path==='/home' " :slide-img="slideImg" />
    </div>
  </div>
</template>

<script>
import carousel from './carousel/index.vue'
import { ref } from "vue";
import { slideshow } from "../../API/play";

export default {
  name: "index",
  components: {
    carousel
  },
  setup() {
    const slideImg = ref([])
    const textPath = ref([
      {name: '首页',path:'/home'},
      {name: '榜单',path:'/fromSong'},
      {name: '歌单',path:'/special'},
      {name: 'MV',path:'/fromMV'},
      {name: '电台',path:'/fmweb'},
      {name: '歌手',path:"/singer"},
      {name: '专辑',path:"/album"},
    ])

    const textIndex = ref(0)

    return { slideImg,textPath,textIndex }
  },
  created() {
    this.slideshow()
  },
  methods: {
    slideshow(){
      slideshow('/banner').then(data => {
        this.slideImg = data.banners
      })
    },
    pathHeader(item) {
      if(this.$route.params.id) {
        window.localStorage.setItem('music-count','false')
      }
      this.textIndex = item.index
      this.$router.push(item.item)
    }
  }
}
</script>

<style lang="less">
@import "./index.less";
</style>
