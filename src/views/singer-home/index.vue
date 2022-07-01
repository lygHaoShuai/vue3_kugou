<template>
  <div style="background-color: rgba(150,100,230,0.1);height: 60px;"/>
  <div class="singer-border">
    <div style="width: 1000px;">
      <div style="height: 144px;display: flex;">
        <div style="height: 144px;display: flex">
          <img :src="singerIntroduced.cover" alt="" style="height: 100%;width: 144px;" />
          <div class="content-border">
            <div style="margin-top: 12px">{{ this.singerIntroduced.name }}</div>
            <div style="font-size: 12px;
            margin-top: 10px;width: 560px;height: 48px;overflow-y: hidden">{{ this.singerIntroduced.briefDesc }}</div>
          </div>
        </div>
        <div style="width: 216px">
          <div style="width: 200px;float: right">
            <div class="similarity-text">相似歌手</div>
            <div class="similarity-style">
              <div v-if="simiSinger[17] && simiSinger[18]"
                  style="display: flex;justify-content: space-between;height: 104px;width: 179px;">
                <div >
                  <img :src="simiSinger[17].img1v1Url" alt="" @click="singerPush(simiSinger[17].id)"
                       style="height: 68px;width: 68px;"/>
                  <div class="similarity-name">{{ this.simiSinger[17].name }}</div>
                </div>
                <div style="background-color: #B8B8B8;height: 100%;width: 1px"></div>
                <div >
                  <img :src="simiSinger[18].img1v1Url" @click="singerPush(simiSinger[18].id)"
                       style="height: 68px;width: 68px;" />
                  <div class="similarity-name">{{ this.simiSinger[18].name }}</div>
                </div>
              </div>
            </div>
            <div style="height: 8px;background-color: #B8B8B8"></div>
          </div>
        </div>
      </div>

      <div style="height: 30px;border-bottom: 1px #bbbbbb solid;margin-top: 30px">
        <div style="margin-left: 12px;width: 200px;display: flex;justify-content: space-between;font-size: 13px">
          <span :style="{color:(optionIndex === index ? '#409EFF' : '')}"
                @click="optionCut(index)" v-for="(item,index) in option"
                :key="index" style="cursor: pointer">{{ item }}</span>
        </div>
      </div>

      <single v-if="optionIndex === 0" :singer-name="this.singerIntroduced.name"/>
      <song v-else-if="optionIndex === 1" />
      <mv v-else />
    </div>
  </div>


</template>

<script>
import { ref,watch } from 'vue'
import single from './module/single.vue'
import song from './module/song.vue'
import mv from './module/mv.vue'
import {singerThe,singerSimilar} from "../../API/play";
export default {
  name: "index",
  setup() {
    const option = ref(['单曲','专辑','MV'])
    const optionIndex  =ref(0)
    const singerIntroduced = ref({})
    const simiSinger = ref({})

    return { option,optionIndex,singerIntroduced,simiSinger }
  },
  components: {
    single,song,mv
  },
  created() {
    watch(() => this.$route.params.singerId,(newVal) => {
      if(this.$route.params.singerId) {
        this.optionThe(newVal)
      }
    },{immediate:true})
  },
  methods: {
    optionCut(index) {
      this.optionIndex = index
    },
    optionThe(id) {
      singerThe('/artist/detail',{id:id}).then(data => {
        this.singerIntroduced = data.data.artist
      })
      singerSimilar('/simi/artist',{id:id}).then(data => {
        this.simiSinger = data.artists
      })
    },
    singerPush(id) {
      this.$router.push(`/singer/home/${id}`)
    }
  }
}
</script>

<style lang="less">
.singer-border {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .content-border {
    height: 100%;
    width: 640px;
    padding-left: 30px;
    border-top: #E46E62 1px solid;
    border-bottom: #E46E62 1px solid;
    border-right: #E46E62 1px solid;
    box-sizing: border-box;

  }
  .similarity-text {
    height: 24px;
    background-color: #B8B8B8;
    padding-left: 8px;
    color: #ffffff;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
  .similarity-style {
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    .similarity-name {
      margin-top: 10px;
      margin-left: 6px;
      font-size: 13px;
    }
  }
}
</style>
