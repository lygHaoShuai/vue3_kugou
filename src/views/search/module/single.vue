<template>
  <div style="height: 59px;background-color: #F8F8F8;
  display: flex;align-items: center;font-size: 14px">

    <input type="checkbox" style="height: 15px;width: 15px"
           v-model="checkAll" @change="AllChange" />
    <div style="margin-left: 10px;display: flex;color: #999999">
      <div style="width: 520px">歌曲名</div>
      <div style="width: 389px">专辑</div>
      <div style="width: 56px">时长</div>
    </div>
  </div>

  <div class="single-border" v-for="(item,index) in cities" :key="index">
    <input type="checkbox" :id=" 'check' + `${index}` " style="height: 15px;width: 15px"
           @change="checkChange(index,item)" />
    <div class="single-style" >
      <div class="nameTex" @click="resolvePlay(item)"
             style="width: 520px">{{ item.name }}</div>
      <div class="nameTex" style="width: 389px">
        <span v-if="item.album.name.length >= 1">《{{ item.album.name }}》</span>
      </div>
      <div style="width: 56px;cursor: default">{{ this.timeDuration(item.duration) }}</div>
    </div>

  </div>

</template>

<script >
import {ref, watch} from 'vue'
import {search} from "../../../API/play";
export default {
  setup() {
    const checkAll = ref(false)

    const checkItem = ref(0)
    const cities = ref([])

    const allList = ref({})

    return { checkAll,cities,checkItem,allList }

  },
  methods: {
    AllChange()  {
      this.cities.forEach((item,index) => {
        const check =document.getElementById(`check${index}`)
        if(this.checkAll) {
          check.checked = true
          this.checkItem = this.cities.length

          this.allList[index] = {
            id: item.id, songName: item.name,
            name: item.artists[0].name, time: item.duration}
        } else {
          check.checked = false
          this.checkItem = 0
          delete this.allList[index]
        }
      })
    },
    checkChange(index,item) {
      const check =document.getElementById(`check${index}`)
      if(check.checked) {
        this.checkItem ++
        this.allList[index] = {
          id: item.id, songName: item.name,
          name: item.artists[0].name, time: item.duration}
      } else {
        this.checkItem --
        delete this.allList[index]
      }

      if(this.checkItem ===this.cities.length ) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    search(src) {
      search('/search',{keywords:src,type:1}).then(data => {
        this.cities = data.result.songs
      })
    },
    timeDuration(time) {
      return (time / 1000 / 60).toFixed(2)
    },
    resolvePlay(item) {
      this.$root.playSong({
        id:item.id,songName:item.name,
        name:item.artists[0].name,time:item.duration})
    },
    playAllList() {
      return this.allList
    }
  },
  created() {

    watch(() => this.$route.params.name,(newVal) => {
      this.search(newVal)
    },{immediate:true})

  }
}
</script>

<style lang="less">
.single-border {
  display: flex;
  height: 59px;
  align-items: center;
  font-size: 14px;
  .single-style {
    margin-left: 10px;
    display: flex;

    div {
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
    .nameTex:hover {
      color: #00A9FF;
      cursor: pointer;

    }
  }
}
.single-border:hover {
  background-color: #F8F8F8;
}
</style>
