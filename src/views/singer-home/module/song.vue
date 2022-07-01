<template>
  <div style="display: flex;flex-wrap: wrap;justify-content: space-between">
    <div v-for="(item,index) in Albums" :key="index"
         :class="{margin:(index === 0 || index === 7)}"
        style="height: 152px;width: 108px;margin-left: 30px;margin-top: 20px">
      <img :src="item.blurPicUrl" style="height: 102px;width: 100%;"  @click="albumPush(item.id)"  />
      <div style="width: 100%;font-size: 13px;display: flex;justify-content: center;margin-top: 8px;">
        <div style="text-overflow: ellipsis;white-space: nowrap;overflow-x: hidden;">{{ item.name }}</div>
      </div>
      <div style="display: flex;justify-content: center;
      margin-top: 3px;color: #B5B9BB;font-size: 12px">
        {{ this.time(item.publishTime) }}
      </div>
    </div>
  </div>

</template>

<script >
import {ref, watch} from 'vue'
import {singerAlbum} from "../../../API/play";
export default {
  setup() {
    const Albums = ref({})

    return { Albums }
  },
  created() {
    this.singerAlbumAll()
  },
  methods: {
    albumPush(id) {
      this.$router.push(`/album/single/${id}`)
    },
    singerAlbumAll() {
      singerAlbum('/artist/album',{id:this.$route.params.singerId,limit:14}).then(data => {
        this.Albums = data.hotAlbums
      })
    },
    time(upTime) {
      const time = new Date(upTime)

      const year = time.getFullYear()
      const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1): (time.getMonth() + 1)
      const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      upTime = `${year}-${month}-${date}`

      return upTime
    }
  }
}
</script>

<style lang="less">
.margin {
  margin-left: unset !important;
}
</style>
