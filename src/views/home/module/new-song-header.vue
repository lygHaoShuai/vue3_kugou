<template>
  <div class="list-border">
    <div class="list-move" >
      <div>
        <span style="cursor: pointer">新歌首发</span>

        <span style="position: relative;width: 80px;display: flex" >

            <el-icon @click="subtract" v-if="isSubtract" :size="15" >
              <ArrowLeftBold />
            </el-icon>
            <el-icon v-else :size="15" color="#CDCDCD" >
              <ArrowLeftBold />
            </el-icon>

          <span style="position: absolute;margin: -4px 0 0 19px;">
            {{ count }} / 3
          </span>
          <div style="width: 40px" />

            <el-icon @click="plus" v-if="isPlus" :size="15" >
              <ArrowRightBold />
            </el-icon>
            <el-icon v-else :size="15" color="#CDCDCD" >
              <ArrowRightBold />
            </el-icon>

        </span>
      </div>
      <div style="position: relative">
        <span style="cursor: default">推荐MV</span>
        <span class="hover" @click="allMV" >
        更多
        <el-icon style="position: absolute;margin-top: 2px" :size="18"><ArrowRight /></el-icon>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ArrowLeft,ArrowLeftBold,ArrowRightBold,ArrowRight } from '@element-plus/icons-vue'
export default {
  name: "song-list-header",
  setup () {
    const count = ref(1)
    const isPlus = ref(true)
    const isSubtract = ref(false)

    return { count,isPlus,isSubtract }
  },
  components: {
    ArrowLeft,
    ArrowLeftBold,
    ArrowRightBold,
    ArrowRight
  },
  methods: {
    allMV() {
      this.$router.push('fromMV')
    },
    plus() {
      if(this.count <= 2) {
        this.count ++
        this.isSubtract = true

        this.$emit('plus')
      }
      if(this.count === 3) {
        this.isPlus = false
      }
    },
    subtract() {
      if(this.count > 1) {
        this.count --
        this.isPlus = true

        this.$emit('subtract')
      }
      if(this.count === 1) {
        this.isSubtract = false
      }
    }
  }
}
</script>

<style lang="less">
.list-border {
  height: 130px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  .list-move {
    width: 1000px;
    display: flex;
    align-items: center;

    div:first-child {
      width: 640px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
    }
    div:last-child {
      width: 360px;
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
    }
    div {
      span:first-child {
        font-size: 30px;
      }
      span:last-child {
        color: #A7A7A7;
        margin-top: 12px;
      }
      .subtract {
        cursor: pointer;
      }
      .subtract:hover {
        color: #00A9FF;
      }
      .plus {
        cursor: pointer;
      }
      .plus:hover {
        color: #00A9FF;
      }
    }
  }
}
</style>
