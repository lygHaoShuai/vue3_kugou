<template>
  <div>
    <div style="display: flex;position: relative;
    height: 112px;border-bottom: 1px #bbbbbb solid" v-if="songIdStyle !== undefined">
      <div style="font-size: 25px;margin-top: 56px;">{{ songIdStyle.name }}</div>
      <div style="color: #A69999;margin: 67px 0 0 34px;">{{ time }}更新</div>
      <el-button style="height: 32px;width: 112px;padding: unset;
      margin: 54px 0 0 580px;position: absolute" type="primary" @click="playListAll">播放全部</el-button>
    </div>

    <div>
      <div style="height: 59px;display: flex;align-items: center;font-size: 14px">

        <input type="checkbox" style="height: 15px;width: 15px"
               v-model="checkAll" @change="AllChange" />
        <div style="margin-left: 10px;color: #999999">
          全选
        </div>
      </div>

      <div class="single-border" v-for="(item,index) in cities" :key="index" >
        <input type="checkbox" :id=" 'special' + `${index}` "
               @change="checkChange(index,item)"
               style="height: 15px;width: 15px"/>
        <div style="padding: 0 6px;color: #bbbbbb"
             :style="{color:(index <= 3 ? '#FF3434' : '')}" >{{ index + 1 }}</div>
        <div class="single-style" >
          <div @click="special(
              {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt})"
               class="nameTex" style="width: 550px">{{ item.name }}
            <span style="color: #bbbbbb;font-size: 13px"> - {{item.ar[0].name}}</span></div>
        </div>
        <div>{{ (item.dt / 1000 / 60).toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {playlist} from '../../../API/play'
import {useStore} from "vuex";

export default {
  name: "special-list-item",
  setup() {
    const time = ref('')
    const checkAll = ref(false)
    const checkItem = ref(0)
    const cities = ref([])
    const allList = ref({})
    const store = useStore()

    return { time,checkAll,cities,checkItem,allList,store }
  },
  props: {
    songIdStyle: Object
  },
  methods: {
    playListAll() {
      this.$root.playListAll(this.allList)

    },
    special(item) {
      this.$root.playSong(item)
    },
    AllChange()  {
      this.cities.forEach((item,index) => {
        const check =document.getElementById(`special${index}`)
        if(this.checkAll) {
          check.checked = true
          this.checkItem = this.cities.length
          this.allList[index] = {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt}
        } else {
          check.checked = false
          this.checkItem = 0
          delete this.allList[index]
        }
      })
    },
    checkChange(index,item) {
      const check =document.getElementById(`special${index}`)
      if(check.checked) {
        this.checkItem ++
        this.allList[index] = {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt}
      } else {
        this.checkItem --
        delete this.allList[index]
      }

      if(this.checkItem ===this.cities.length ) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    }
  },
  watch: {
    songIdStyle() {
      const time = new Date(this.songIdStyle.updateTime)
      const year = time.getFullYear()
      const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1): (time.getMonth() + 1)
      const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      this.time = `${year}-${month}-${date}`

      this.checkAll = false
      this.checkItem = 0
      this.cities = []
      this.allList = {}

      playlist('/playlist/track/all',
          {id:this.songIdStyle.id, limit:20}).then(data => {
        this.cities = data.songs
      })
      window.scrollTo(0,0)

    }
  }
}
</script>

<style lang="less">
.single-border {
  display: flex;
  height: 35px;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  .single-style {
    margin-left: 10px;
    .nameTex {
      &:hover {
        color: #00A9FF;
      }
    }
  }
}
.single-border:hover {
  background-color: #F8F8F8;
}
</style>
