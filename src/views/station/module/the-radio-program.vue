<template>
  <div style="width: 176px;">
    <div class="class-header">
      <el-icon style="padding-right: 5px"><Menu /></el-icon>
      电台分类
    </div>
    <div :style="{ marginTop:index===0 ? 'unset' : ''}"
         :class="{background : classIndex === index}"
         class="class-name" v-for="(item,index) in classList"
         @click="backgroundIndex(index)" :key="index">
      <span style="padding-left: 32px">
        {{ item.name }}电台
        <span v-if="classIndex === index">({{count}})
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import {Menu} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {newMV, stationClassify} from '../../../API/play'
import store from '../../../store'
export default {
  name: "the-radio-program",
  setup() {
    const classList = ref([])
    const classIndex = ref(0)
    return { classList,classIndex }
  },
  components: {
    Menu
  },
  created() {
    this.ClassifyDJ()
  },
  props: {
    count: Number
  },
  methods: {
    ClassifyDJ() {
      const { profile } = store.state.user
      stationClassify('/dj/catelist', {cookie:profile.cookie}).then(data => {
        this.classList = data.categories
        this.$emit('classList',this.classList[0].id)
      })
    },
    backgroundIndex(index) {
      this.classIndex = index
      this.$emit('classList',this.classList[index].id)
    }
  }
}
</script>

<style lang="less">
.class-header {
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 64px;
  font-weight: bold
}
.class-name {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  height: 48px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
}
.background {
  background-color: #F6F8FA;
  color: #00A9FF;
}
</style>
