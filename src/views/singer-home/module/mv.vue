<template>
  <div style="margin-top: 30px;font-size: 13px">
    暂无记录
  </div>
</template>

<script >
import {ref, watch} from 'vue'
import {search} from "../../../API/play";
export default {
  setup() {
    const cities = ref([])

    return { cities }
  },
  methods: {

  }
}
</script>

<style lang="less">
.mv-text {
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
