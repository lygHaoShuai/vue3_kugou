<template>
  <div style="display: flex;justify-content: center">
    <div>
      <div style="width: 1000px;display: flex;height: 80px;
      align-items: center;justify-content: space-between">
        <span style="cursor: default;font-size: 25px">热门电台</span>
        <span @click="stationAll" class="hover">
          更多
          <el-icon style="position: absolute;margin-top: 4px" :size="15"><ArrowRight /></el-icon>
        </span>
      </div>
      <div>
        <div class="dj-border">
          <div style="height: 200px;width: 153px;margin-right: 20px" v-for="(item,index) in djHot" :key="index">
            <div style="width: 153px;height: 153px;overflow: hidden;border-radius: 15px;position: relative">
              <img class="dj-img" :src="item.picUrl" :id=" 'djImg' + index"
                   @mousemove="djImgShow(index)" @mouseleave="djImgHidden(index)"/>
              <div v-if="djImgPopup === index" @mousemove="djImgShow(index)" @mouseleave="djImgHidden(index)"
                   class="djImg-overspread"/>
            </div>

            <div class="dj-text" style="">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
import {stationHot} from "../../../API/play";
import {ref} from 'vue'
export default {
  name: "show-dj",
  setup() {
    const djHot = ref([])
    const djImgPopup = ref(null)
    return { djHot,djImgPopup }
  },
  components: {
    ArrowRight
  },
  created() {
    this.stationHot()
  },
  methods: {
    stationHot() {
      stationHot('/dj/hot', {limit:6}).then(data => {
        this.djHot = data.djRadios
      })
    },
    djImgShow(index) {
      this.djImgPopup = index
      const djImg = document.getElementById('djImg' + index)
      djImg.style.cssText = 'transform:scale(1.2,1.2);'
    },
    djImgHidden(index) {
      this.djImgPopup = null
      const djImg = document.getElementById('djImg' + index)
      djImg.style.cssText = 'transform:scale(1,1);'
    },
    stationAll() {
      this.$router.push('/fmweb')
    }
  }
}
</script>

<style lang="less">
.hover:hover {
  color: #00A9FF;
  cursor: pointer;
}
.dj-border {
  display: flex;

  .dj-img {
    height: 153px;
    width: 153px;
    border-radius: 15px
  }
  .djImg-overspread {
    background: rgba(37,42,47,0.3) url("../../../assets/icon_play_white.png") center no-repeat;
    background-size: 40px;
    width: 153px;
    height: 153px;
    position: absolute;
    margin-top: -158px;
    cursor:pointer;
  }
  .dj-text {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #bbbbbb;
    margin-top: 10px
  }
  div:first-child {
    margin-right: unset;
  }
}
</style>
