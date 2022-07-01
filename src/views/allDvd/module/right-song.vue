<template>
  <div>
    <div v-if="this.typeTime">
      <div style="height: 30px">{{ this.typeName[this.typeIndex] }}专辑共(100张)</div>
      <div style="display: flex;flex-wrap: wrap">
        <div class="song-list" v-for="(item,index) in albumList" :key="index">
          <div class="list-img">
            <el-image style="height: 100%;width: 100%" @click="albumPush(item.id)"
                      :src="item.blurPicUrl" lazy />
          </div>
          <div style="margin-left: 12px">
            <div class="list-name">{{ item.name }}</div>
            <div class="list-time">作者 : {{ item.artist.name }}</div>
            <div class="list-time">{{ this.bayTime(item.publishTime) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="height: 30px">{{ this.timeName[this.timeIndex] }}专辑共(100张)</div>
      <div style="display: flex;flex-wrap: wrap">
        <div class="song-list" v-for="(item,index) in bayTimeDate[timeStyle[timeIndex]].slice(start,end)" :key="index">
          <div class="list-img">
            <el-image style="height: 100%;width: 100%" :src="item.blurPicUrl" lazy />
          </div>
          <div style="margin-left: 12px">
            <div class="list-name">{{ item.name }}</div>
            <div class="list-time">作者 : {{ item.artist.name }}</div>
            <div class="list-time">{{ this.bayTime(item.publishTime) }}</div>
          </div>
        </div>
      </div>
    </div>
    <bottomCount :typeIndex="typeIndex" style="border-top: 1px #B5B9BB solid;"
                 @indexOf="indexOf($event)" />
  </div>
</template>

<script>
import {allDVD} from "../../../API/play"
import { ref } from 'vue'
import bottomCount from './bottom-count.vue'
export default {
  name: "right-song",
  setup() {
    const albumList = ref([])
    const type = ref(['ZH','EA','KR','JP'])
    const typeName = ref(['华语','欧美','日语','韩语'])
    const timeName = ref(['全部','近七天','近一月'])
    const bayTimeDate = ref({})

    const typeTime = ref(true)
    const timeIndex = ref(0)
    const timeStyle = ref(['all','seven','month','rose'])

    const start = ref(0)
    const end = ref(10)
    return { albumList,type,typeName,timeName,bayTimeDate,typeTime,timeIndex,timeStyle,
      start,end }
  },
  components: {
    bottomCount
  },
  props: {
    typeIndex: Number
  },
  created() {
    this.albumAll()
    this.timeAll()
  },
  methods: {
    albumPush(id) {
      this.$router.push(`/album/single/${id}`)
    },
    albumAll() {
      allDVD('/album/new',{area:this.type[this.typeIndex],offset:this.start,limit:10}).then(data => {
        this.albumList = data.albums
      })

    },
    timeAll() {
      allDVD('/album/new',{area:'ZH',offset:0,limit:500}).then(data => {
        let timeNew = 1000 * 60 * 60 * 24
        let seven = new Date().getTime() - (timeNew * 7)
        let month = new Date().getTime() - (timeNew * 30)
        let rose = new Date().getTime() - (timeNew * 30 * 3)

        data.albums.forEach(item => {
          if(item.publishTime >= seven) {
            if(this.bayTimeDate['seven']) {
              if(this.bayTimeDate['seven'].length < 100) {
                this.bayTimeDate['seven'].push(item)
              } else {
                this.allTime(item)
              }
            } else {
              this.bayTimeDate['seven'] = [item]
            }
          } else if(item.publishTime >= month) {
            if(this.bayTimeDate['month']) {
              if(this.bayTimeDate['month'].length < 100) {
                this.bayTimeDate['month'].push(item)
              } else {
                this.allTime(item)
              }
            } else {
              this.bayTimeDate['month'] = [item]
            }
          }
        })
      })

    },
    allTime(item) {
      if(this.bayTimeDate['all']) {
        if(this.bayTimeDate['all'].length < 100) {
          this.bayTimeDate['all'].push(item)
        }
      } else {
        this.bayTimeDate['all'] = [item]
      }
    },
    bayTime(item) {
      let time = new Date(item)
      const year = time.getFullYear()
      const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1): (time.getMonth() + 1)
      const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      return (`${year}-${month}-${date}`)
    },
    indexOf(index) {
      this.start = (index - 1) * 10
      this.end = index * 10
      if(this.typeTime) {
        this.albumAll()
      }
    }
  },
  watch: {
    typeIndex() {
      if(this.typeIndex >= 4) {
        this.timeIndex = this.typeIndex - 4
        this.typeTime = false
        this.start = 0
        this.end = 10
      } else {
        this.albumAll()
        this.typeTime = true
        this.start = 0
      }
    }
  }
}
</script>

<style lang="less">
.song-list {
  border-top: 1px #B5B9BB solid;
  display: flex;
  padding-top: 14px;
  box-sizing: border-box;
  height: 128px;
  width: 360px;
  .list-img {
    height: 100px;
    width: 100px;
    background-color: #E46E62;
    cursor: pointer;
  }
  .list-name {
    cursor: pointer;
    width: 200px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    &:hover {
      color: #00A9FF;
    }
  }
  .list-time {
    font-size: 13px;
    margin-top: 10px;
    cursor: default;
    color: #8E8E8E;
  }
}
</style>
