<template>
  <div>
    <div>
      <div style="height: 59px;display: flex;align-items: center;font-size: 14px">

        <input type="checkbox" style="height: 15px;width: 15px"
               v-model="checkAll" @change="AllChange" />
        <div style="margin-left: 10px;color: #999999">
          全选
        </div>
        <el-button style="margin-left: 300px" type="primary" size="small"
                   @click="playListAll" plain>播放全部</el-button>
      </div>

      <div class="single-border" v-for="(item,index) in cities" :key="index" >
        <input type="checkbox" :id=" 'special' + `${index}` "
               @change="checkChange(index,item)"
               style="height: 15px;width: 15px"/>
        <div style="padding: 0 6px;color: #bbbbbb"
             :style="{color:(index <= 3 ? '#FF3434' : '')}" >{{ index + 1 }}</div>
        <div class="nameTex" @click="special(
            {id:item.id,songName:item.name,name:item.ar[0].name,time:item.dt})"
        >{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import { songPlayList } from '../../../API/play'
import {useStore} from "vuex";

export default {
  name: "special-list-item",
  setup() {

    const checkAll = ref(false)
    const checkItem = ref(0)
    const cities = ref([])
    const allList = ref({})
    const store = useStore()

    return { checkAll,cities,checkItem,allList,store }
  },
  created() {
    this.songIdStyle()
  },
  mounted() {
    watch(() => this.$route.params.singleId,() => {
      this.songIdStyle()
    },{immediate:true})
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
      console.log(this.allList)
    },

    songIdStyle() {
      songPlayList('/playlist/track/all',
          {id:this.$route.params.singleId, limit:20}).then(data => {
        this.cities = data.songs
      })

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
    .nameTex {
      margin-left: 10px;
      width: 200px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
      &:hover {
        color: #00A9FF;
      }
    }

}
.single-border:hover {
  background-color: #F8F8F8;
}
.el-button {
  margin: unset;
}
</style>
