<template>
  <div style="width: 100%;display: flex;justify-content: center;
  margin-top: 60px;background-color: #3C464E">
    <div>
      <video :controls="true" autoplay height="580" width="1000"
             :src="this.url"></video>
      <div style="height: 60px;display: flex;align-items: center">
        <span style="color: #F4FBFE;font-size: 21px;">{{ this.name.artistName }} -
        {{ this.name.name }}</span>

      </div>
    </div>
  </div>
  <div style="height: 208px;background-color: #F4FBFE;display: flex;justify-content: center">
    <div style="width: 1200px;">
      <div style="font-weight: bold;font-size: 20px;margin-top: 20px">猜你喜欢</div>
      <div style="margin-top: 20px;display: flex;justify-content: space-between">
        <div style="width: 170px;" v-for="(item,index) in live" :key="index">
          <img :src="item.cover" @click="pushMV(item.id)"
               style="height: 96px;border-radius: 20px;cursor: pointer" />
          <div style="overflow-x: hidden;text-overflow: ellipsis;margin-top: 5px;
          white-space: nowrap;">
            <span>{{ item.artistName }}</span> - <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {player,similarMV} from "../../API/play";
import {ref, watch} from 'vue'
export default {
  name: 'df',
  setup() {
    const url = ref('')
    const name = ref({})
    const live = ref({})

    return { url,name,live }
  },
  mounted() {
    watch(() => this.$route.params.playerId,(newVal) => {
      if(this.$route.params.playerId) {
        this.getMusicUrl()
      }
    },{immediate:true})
  },
  methods: {
    getMusicUrl() {
      player('/mv/url', {id: this.$route.params.playerId}).then(data => {
        this.url = data.data.url
      })
      player('/mv/detail', {mvid: this.$route.params.playerId}).then(data => {
        this.name = {'artistName': data.data.artistName,'name':data.data.name}
      })
      similarMV('/simi/mv', {mvid: this.$route.params.playerId}).then(data => {
        this.live = data.mvs
      })
    },
    pushMV(id) {
      this.$router.push(`/video/player/${id}`)
    }
  }
}
</script>

<style scoped>

</style>
