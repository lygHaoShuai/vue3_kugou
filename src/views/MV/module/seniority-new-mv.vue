<template>
  <div style="display: flex;justify-content: center;">
    <div style="display: flex;width: 1000px;">
      <div style="flex: 2">
        <div style="width: 650px;position: relative">
          <el-carousel :autoplay="true" :loop="true" indicator-position="outside"  >
            <el-carousel-item v-for="(item,index) in newImgMV" :key="index">
              <div style="height: 320px;">
                <img :src="item.cover" style="width: 100%;height: 100%;" @click="playMV(item.id)" />
                <div style="position: absolute;z-index: 12;margin-top: -56px;
                margin-left: 30px;color: #ffffff;font-size: 14px;">
                  {{ item.artistName }}
                </div>
              </div>

            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div style="background-color: #E881AE;flex: 1">
        <div style="display: flex;height: 32px;border-bottom: 3px #ffffff solid">
          <div style="flex: 2;border-right: 1px #ffffff solid;cursor: default"
               class="seniority-border-header">MV热播总排行</div>
          <div style="flex: 1;cursor: pointer" class="seniority-border-header">更多</div>
        </div>
        <div style="display: block">
          <div v-for="(item,index) in seniorityList" :key="index" class="seniority-border" style="">
            <div :style="{color: (index > 2 ? '#959595' : '') }" style="width: 30px;font-size: 17px">{{index+1}}</div>
            <span @click="playMV(item.id)">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {newMV,seniorityMV} from "../../../API/play";
import {ref} from 'vue'
export default {
  name: "seniority-new-mv",
  setup() {
    const newImgMV = ref([])
    const seniorityList = ref([])
    return { newImgMV,seniorityList }
  },
  created() {
    this.newMv()
    this.seniority()
  },
  methods: {
    playMV(id) {
      let routePlay = this.$router.resolve(`/video/player/${id}`)
      window.open(routePlay.href, '_blank')
    },
    newMv() {
      newMV('/mv/first', {limit:10}).then(data => {
        this.newImgMV = data.data

      })
    },
    seniority() {
      seniorityMV('/top/mv', {limit:10}).then(data => {
        this.seniorityList = data.data
      })
    }
  }
}
</script>

<style lang="less">
.seniority-border-header {
  display: flex;
  align-items: center;
  background-color: #DEB200;
  justify-content: center;
  color: #FFFFFF;
}
.seniority-border {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: #363636;
  height: 26.5px;color: #ffffff;
  font-size: 12px;
  &:hover {
    background-color: #bbbbbb;
  }
}

.el-carousel__arrow--left {
  display: none;

}
.el-carousel__arrow--right {
  display: none;
}
.el-carousel__indicators--outside button {

  height: 12px;
  border-radius: 50%;
  width: 12px;
}
.el-carousel__indicators--outside {
  background-color: rgba(54,54,54,0.3);
  position: absolute;
  width: 100%;
  margin: 0 0 -26px -325px;
}
</style>
