<template>
  <div>
    <div style="background-color: rgba(200,200,100,0.1);height: 60px;"/>
    <div style="display: flex;justify-content: center;margin-top: 30px">
      <div style="width: 1000px;">
        <div class="search-select">
          <div :class="{select: selectIndex === index}"
               @click="searchSelect(index)"
               v-for="(item,index) in selectTex">{{ item }}</div>
        </div>
        <div style="height: 50px;display: flex;align-items: center;font-size: 14px;justify-content: space-between">
          <div>
            搜索到<span style="color: #00A9FF">
            "{{this.$route.params.name}}"
            </span>相关{{this.selectTex[this.selectIndex]}}
          </div>
          <div v-if="selectIndex === 0" @click="playAll">
            <el-button type="primary">播放全部</el-button>
          </div>
        </div>

        <single ref="playList" v-if="selectIndex === 0" />
        <song v-else-if="selectIndex === 1" />
        <MV v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { watch,ref } from 'vue'
import single from "./module/single.vue";
import song from "./module/song.vue";
import MV from "./module/mv.vue";
export default {
  name: "index",
  setup() {
    const selectTex = ref(['单曲','歌单','MV'])
    const selectIndex = ref(0)

    return { selectTex,selectIndex }
  },
  components: {
    single,
    song,
    MV
  },
  methods: {
    searchSelect(index) {
      this.selectIndex = index
    },
    playAll() {
      let list = this.$refs.playList.playAllList()
      this.$root.playListAll(list)
    }
  },
  mounted() {
    watch(() => this.$route.params.name,() => {
      this.selectIndex = 0
    },{immediate:true})
  }
}
</script>

<style lang="less">
.search-select {
  display: flex;
  div {
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
      color: #00A9FF;
    }
  }
  .select {
    border-bottom: 2px #00A9FF solid;
    color: #00A9FF;
  }
}
</style>
