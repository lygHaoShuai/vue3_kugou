<template>
  <div style="display: flex;justify-content: center;">
    <div style="width: 1000px;">
      <body-header />
      <body-body @SongSelect="SongSelect($event)" :index-song="indexSong"
                 style="margin-top: 20px;height: 460px" />
      <body-bottom @countSong="countSong($event)" :songSelect="songSelect" />
    </div>
  </div>
</template>

<script>
import bodyHeader from './module/body-header.vue'
import bodyBody from './module/body-body.vue'
import bodyBottom from './module/body-bottom.vue'
import { ref } from 'vue'
export default {
  name: "seniority-new-body",
  setup() {
    const indexSong = ref(0)
    const songSelect = ref(0)
    const total = ref(0)

    return{ indexSong,songSelect,total }
  },
  components: {
    bodyHeader,
    bodyBody,
    bodyBottom
  },
  methods: {
    countSong(countSong) {
      this.indexSong = (countSong-1) * 20
    },
    SongSelect(value) {
      this.songSelect = value
    }
  }
}
</script>

<style scoped>

</style>
