<template>
  <div class="vitae-list" v-if="special.creator && special.createTime">
    <div style="height: 152px;width: 152px">
      <img style="width: 100%;height: 100%" :src="this.special.coverImgUrl" alt="">
    </div>
    <div><span class="name-style">名称:&nbsp;&nbsp;</span>
      <span class="class-style">{{ this.special.name }}</span></div>

    <div><span class="name-style">创建人:&nbsp;&nbsp;</span>
      <span class="class-style">{{ this.special.creator.nickname }}</span></div>

    <div><span class="name-style">更新时间:&nbsp;&nbsp;</span>
      <span class="class-style">{{ this.createTime(this.special.createTime) }}</span> </div>

    <div class="vitae-style" >
      <span class="name-style">简介:&nbsp;&nbsp;</span>
      <span class="class-style">{{ this.special.description }}</span> </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import {getSongDetails} from "../../../API/play";
export default {
  name: "shopping-Guide",
  setup() {
    const special = ref({})

    return { special }
  },
  mounted() {
    watch(() => this.$route.params.singleId,() => {
      this.songList()
    },{immediate:true})
  },
  methods: {
    songList() {
      getSongDetails('/playlist/detail',
          {id:this.$route.params.singleId, limit:20}).then(data => {
        this.special = data.playlist
      })
    },
    createTime(time) {
      let newTime = new Date(time)
      const year = newTime.getFullYear()
      const month = newTime.getMonth() + 1 < 10 ? '0' + (newTime.getMonth() + 1): (newTime.getMonth() + 1)
      const date = newTime.getDate() < 10 ? '0' + newTime.getDate() : newTime.getDate()
      time = `${year}-${month}-${date}`

      return time
    }
  }
}
</script>

<style lang="less">
.vitae-list {
  height: 30px;
  width: 200px;
  padding-left: 25px;
  div {
    margin-top: 10px;
  }
  .vitae-style {
    height: 240px;
    overflow-y: scroll;
    margin-top: 15px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .name-style {
    font-size: 13px;
    color: #bbbbbb;
  }

  .class-style {
    font-size: 13px;
  }
}
</style>
