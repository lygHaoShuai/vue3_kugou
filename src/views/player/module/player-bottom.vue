<template>
  <div class="control-border">

    <div v-if="listIndex!==0" class="retreat" @click="previous"></div>
    <div v-else class="retreat-end" ></div>
    <div @click="startEnd" :class="{active: play } " class="start-end"></div>

    <div v-if="listIndex!==listLength - 1" class="advance" @click="next"></div>
    <div v-else class="advance-end" ></div>
    <img :src="singerStyle.img" class="img" />
    <div class="progress-bar">
      <div style="display: flex;justify-content: space-between">
        <span>{{ singerStyle.name }}</span>
        <div >
          <span>{{ (this.newTime/60).toFixed(2) }}</span> /
          <span>{{ (this.allTime/60/1000).toFixed(2) }}</span>
        </div>

      </div>
      <input @oninput="checked" @change="checked" style="width: 372px;height: 4px"
             v-model="volume" type="range" min="0" max="1" step="0.05"  />
    </div>
    <div class="voice"></div>
    <div class="circulation "></div>
    <div class="download"></div>
    <div class="send"></div>
    <div class="make" @click="listShow">
      <span style="position: absolute;margin-left: 38px;margin-top: 2px">{{ this.listLength }}</span>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: "player-bottom",
  props: {
    play: Boolean,
    newTime: Number,
    allTime: Number,
    listIndex: Number,
    singerStyle: Object,
    listLength: Number
  },
  setup() {
    const volume = ref(0)
    return { volume }
  },
  methods: {
    next() {
      this.$emit('next')
    },
    previous() {
      this.$emit('previous')
    },
    startEnd() {
      this.$emit('startEnd')
    },
    checked () {
      this.$emit('progressBar',this.volume)
    },
    listShow() {
      this.$emit('listShow')
    }
  },
  watch: {
    newTime(newVal) {
      const times = (newVal / (this.allTime/ 1000 / 100)) / 100
      this.volume = times.toFixed(3)
    }
  }
}
</script>

<style lang="less">
.control-border {
  height: 80px;
  min-width: 1000px !important;
  background-color: #3C464E;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    margin: 0 15px;
  }
  .retreat-end {
    width: 36px;
    height: 38px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: 0 -143px;
  }
  .retreat {
    width: 36px;
    height: 38px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: -36px -143px;
  }
  .start-end {
    width: 58px;
    height: 53px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: 0px -5px;
  }
  .active {
    background-position: 0px -65px;
  }
  .advance-end {
    width: 36px;
    height: 38px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: -144px -143px;
  }
  .advance {
    width: 36px;
    height: 38px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: -180px -143px;
  }
  .img {
    width: 60px;
    height: 60px;
    background-color: #00A9FF;
  }
  .progress-bar {
    width: 372px;
  }
  .voice {
    width: 20px;
    height: 14px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: 4px -196px;
  }
  .circulation {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: -60px -177px;
  }
  .download {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: -235px -31px;
  }
  .send {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: -236px 4px;
  }
  .make {
    width: 69px;
    height: 25px;
    border-radius: 20%;
    background-image: url("../../../assets/btn.png");
    background-repeat: no-repeat;
    background-position: 9px -118px;
    position: relative;
    color: #E46E62;
    box-sizing: border-box;
    cursor: default;
  }
}
</style>
