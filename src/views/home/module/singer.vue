<template>
  <div style="display: flex;justify-content: center">
    <div>
      <div style="width: 1000px;display: flex;height: 80px;
      align-items: center;justify-content: space-between">
        <span style="cursor: default;font-size: 25px">热门歌手</span>
        <div class="singer-type">
          <span :class="{highlight:typeHighlight === index}" @mousemove="typeCut(index)"
                v-for="(item,index) in type" :key="index">{{ item }}</span>
        </div>
        <span class="hover" @click="singer">
          更多
          <el-icon style="position: absolute;margin-top: 4px" :size="15"><ArrowRight /></el-icon>
        </span>
      </div>
      <div style="height: 200px;margin-top: 20px;display: flex;justify-content: space-between">
        <div v-for="(item,index) in singerList.slice(0,5)" :key="index">
          <div style="border-radius: 50%;height: 144px;width: 144px;overflow: hidden" @click="singerPush(item.id)">
            <img class="img-hover" :src="item.img1v1Url" />
          </div>
          <div style="width: 144px;height: 30px;display: flex;
          align-items: center;justify-content: center">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
import {singerHot} from "../../../API/play";
import {ref} from 'vue'
export default {
  name: "singer",
  setup() {
    const type = ref(['华语','欧美','韩语','日语'])
    const typeHighlight = ref(0)
    const singerList = ref([])

    return { type,typeHighlight,singerList }
  },
  components: {
    ArrowRight
  },
  created() {
    this.singerHot()
  },
  methods: {
    singerHot() {
      singerHot('/toplist/artist',{type:this.typeHighlight+1}).then(data => {
        this.singerList = data.list.artists

      })

    },
    singer() {
      this.$router.push('singer')
    },

    typeCut(index) {
      if(this.typeHighlight !== index) {
        this.typeHighlight = index
        this.singerHot()
      }
    },
    singerPush(id) {
      this.$router.push(`/singer/home/${id}`)
    }
  }
}
</script>

<style lang="less">
.singer-type {
  margin-right: 500px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  span {
    width: 48px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .highlight {
    background-color: #E5F6FF;
    color: #00A9FF;
    border-radius: 15px;
    cursor: pointer;
  }
}
.img-hover {
  height: 100%;
  width: 100%;
}
.img-hover:hover {
  transform: scale(1.2,1.2);
}
</style>
