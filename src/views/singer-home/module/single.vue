<template>
  <div style="height: 50px;
  display: flex;align-items: center;font-size: 14px">

    <input type="checkbox" style="height: 15px;width: 15px"
           v-model="checkAll" @change="AllChange" />
    <div style="margin-left: 10px;display: flex;justify-content: space-between;align-items: center;
    color: #999999;width: 980px">
      <div style="">全选</div>
      <el-button @click="playAll"
          style="height: 30px;font-size: 13px;float: right" type="primary">播放</el-button>
    </div>
  </div>

  <div class="single-border" v-for="(item,index) in cities.slice(0,20)" :key="index">
    <input type="checkbox" :id=" 'checkIndex' + `${index}` " style="height: 15px;width: 15px"
           @change="checkChange(index,item)" />
    <div class="single-style" >
      <span v-if="index <= 8">0</span> {{ index + 1 }}  &nbsp;&nbsp; {{ item.name }}
    </div>

  </div>

</template>

<script >
import {ref, watch} from 'vue'
import { singerSong } from "../../../API/play";
export default {
  setup() {
    const checkAll = ref(false)

    const checkItem = ref(0)
    const cities = ref([])

    const allList = ref({})

    return { checkAll,cities,checkItem,allList }

  },
  props: {
    singerName: String
  },
  created() {

    watch(() => this.$route.params.singerId,(newVal) => {
      this.singerSongAll(newVal)
    },{immediate:true})
  },
  mounted() {


  },
  methods: {
    AllChange() {
      this.cities.slice(0,20).forEach((item, index) => {
        const check = document.getElementById(`checkIndex${index}`)
        if (this.checkAll) {
          check.checked = true
          this.checkItem = this.cities.length
          this.allList[index] = {
            id: item.id, songName: item.name,
            name: this.singerName, time: item.dt}
        } else {
          check.checked = false
          this.checkItem = 0
          delete this.allList[index]
        }
      })
    },
    checkChange(index,item) {
      const check = document.getElementById(`checkIndex${index}`)
      if (check.checked) {
        this.checkItem++
        this.allList[index] = {
          id: item.id, songName: item.name,
          name: this.singerName, time: item.dt}
      } else {
        this.checkItem--
        delete this.allList[index]
      }

      if (this.checkItem === this.cities.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    playAll() {
      this.$root.playListAll(this.allList)
    },
    singerSongAll(id) {
      singerSong('/artists',{id:id}).then(data => {
        this.cities = data.hotSongs
        const time = setTimeout(() => {
          this.checkAll = true
          this.AllChange()
        },100)
      })
    }
  }
}
</script>

<style lang="less">
.single-border {
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 14px;
  .single-style {
    margin-left: 10px;
    display: flex;
    font-size: 12px;
  }
}
</style>
