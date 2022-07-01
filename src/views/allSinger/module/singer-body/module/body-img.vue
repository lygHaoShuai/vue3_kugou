<template>
  <div v-if="this.singerHotList[finalist]" style="display: flex;flex-wrap: wrap;">
    <div v-for="(item,index) in singerHotList[finalist].slice(start,end)" :key="index"
        style="height: 104px;width: 72px;margin-right: 13px">
      <div style="height: 72px;width: 72px">
        <el-image @click="singerHome(item.id)" :src="item.img1v1Url" lazy />
      </div>
      <div class="text-name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { singerHot } from "../../../../../API/play";

export default {
  name: "body-img",
  setup() {
    const singerHotList = ref({})
    return { singerHotList }
  },
  props: {
    finalist: String,
    start: Number,
    end: Number
  },
  created() {
    this.singerHot()
  },
  methods: {
    singerHome(id) {
      this.$router.push(`/singer/home/${id}`)
    },
    singerHot(index) {
      if(!index) {
        singerHot('/top/artists',{limit:100}).then(data => {
          this.selected(data.artists)
        })
      } else {
        singerHot('/toplist/artist',{type:index}).then(data => {
          this.selected(data.list.artists)
        })
      }

    },

    selected(item) {
      //储存列表
      let stockpileList = {}
      //中文
      let Chinese = /^[\u4e00-\u9fa5]+$/
      // 英文
      let English = /^[A-Za-z]+(\s+[A-Za-z]+)*$/
      // 包含中文
      let ContainsChinese = /[A-Za-z]/
      //只能有英文
      let absoluteEnglish = /^[A-Za-z]+$/

      item.forEach(itemName => {
        if(stockpileList['all']) {
          stockpileList['all'].push(itemName)
        } else {
          stockpileList['all'] = [itemName]
        }
        if(itemName.name.match(Chinese)) {

          if(itemName.alias.length >= 1) {

            let length = itemName.alias[0].split(/[ ，]/).length
            let ChineseName = itemName.alias[0].split(/[ ，]/)

            if(length === 1) {
              if(ChineseName[0].match(absoluteEnglish)) {
                //可以提取
                let index = ChineseName[0][0].toUpperCase()

                if(stockpileList[index]) {
                  stockpileList[index].push(itemName)
                } else {
                  stockpileList[index] = [itemName]
                }

              } else {
                //不能提取
                if(stockpileList['#']) {
                  stockpileList['#'].push(itemName)
                } else {
                  stockpileList['#'] = [itemName]
                }
              }
            } else if(length > 1) {
              if(ChineseName[1].match(absoluteEnglish)){
                //可以提取
                let index = ChineseName[1][0].toUpperCase()

                if(stockpileList[index]) {
                  stockpileList[index].push(itemName)
                } else {
                  stockpileList[index] = [itemName]
                }

              } else {
                //不能提取
                if(stockpileList['#']) {
                  stockpileList['#'].push(itemName)
                } else {
                  stockpileList['#'] = [itemName]
                }
              }
            } else {
              //不能提取
              if(stockpileList['#']) {
                stockpileList['#'].push(itemName)
              } else {
                stockpileList['#'] = [itemName]
              }
            }
          } else {
            //不能提取
            if(stockpileList['#']) {
              stockpileList['#'].push(itemName)
            } else {
              stockpileList['#'] = [itemName]
            }
          }

        }else if(itemName.name.match(English)) {
          let index = itemName.name[0].toUpperCase()

          if(stockpileList[index]) {
            stockpileList[index].push(itemName)
          } else {
            stockpileList[index] = [itemName]
          }

        }
        else if(itemName.name.match(ContainsChinese)) {
          if(itemName.name[0].match(/^[a-zA-Z]{1}/)) {
            //可以提取
            let index = itemName.name[0].toUpperCase()

            if(stockpileList[index]) {
              stockpileList[index].push(itemName)
            } else {
              stockpileList[index] = [itemName]
            }

          } else {
            if(stockpileList['#']) {
              stockpileList['#'].push(itemName)
            } else {
              stockpileList['#'] = [itemName]
            }
          }
        }else {
          //不能提取
          if(stockpileList['#']) {
            stockpileList['#'].push(itemName)
          } else {
            stockpileList['#'] = [itemName]
          }
        }
      })
      this.singerHotList = stockpileList
    },
  },
  watch: {
    finalist() {
      if(this.singerHotList[this.finalist]) {
        this.$emit('listLength', this.singerHotList[this.finalist].length)
      } else {
        this.$emit('listLength', 0)
      }
    }
  }
}
</script>

<style lang="less">
.text-name {
  font-size: 12px;
  margin-top: 8px;
  width: 72px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis
}
</style>
