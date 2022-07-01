<template>
  <div >
    <div style="display: flex;flex-wrap: wrap">
      <div v-for="(item,index) in djRadioList" :key="index"
           style="width: 168px;height: 240px;margin-left: 18px;cursor: pointer">
        <div style="width: 168px;height: 168px;position: relative;overflow: hidden;">

          <el-image class="class-img-list" :id=" 'classDjImg' + index"
                    :src="item.intervenePicUrl" @mousemove="classShow(index)"
                    @mouseleave="classHidden(index)" lazy />

          <div v-if="isClassDj === index"
               @mousemove="classShow(index)" @mouseleave="classHidden(index)"
               class="class-overspread"></div>
        </div>
        <span style="padding-top: 10px;display: flex;align-items: center;font-size: 12px">{{ item.lastProgramName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import store from "../../../store";
import {radioCategory} from "../../../API/play";

export default {
  name: "classification-of-radio",
  setup() {
    const djRadioList = ref([])
    const isClassDj = ref(null)
    return { djRadioList,isClassDj }
  },
  created() {
    this.RadioCategory()
  },
  props: {
    classListId: Number
  },
  methods: {
    RadioCategory() {
      radioCategory('/dj/radio/hot',{cateId:this.classListId ? this.classListId : 3}).then(data => {
        this.djRadioList = data.djRadios
        this.$emit('djCount',data.djRadios.length)
      })
    },
    classShow(index) {
      this.isClassDj = index
      const classImg = document.getElementById('classDjImg'+index)
      classImg.style.cssText = 'transform:scale(1.2,1.2);'
    },
    classHidden(index) {
      this.isClassDj = null
      const classImg = document.getElementById('classDjImg'+index)

      classImg.style.cssText = 'transform:scale(1,1);'
    },
  },
  watch: {
    classListId() {
      this.RadioCategory()
    }
  }
}
</script>

<style lang="less">
.class-img-list {
  width: 168px;
  height: 168px;
}
.class-overspread {
  background: rgba(37,42,47,0.3) url("../../../assets/icon_play_white.png") center no-repeat;
  background-size: 55px;
  width: 100%;
  height: 100%;
  margin-top: -172px;
  position: absolute;
}
</style>
