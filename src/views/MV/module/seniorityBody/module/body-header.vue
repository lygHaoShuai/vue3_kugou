<template>
  <div style="width: 100%;display: flex;height: 32px">
    <div style="flex: 1">
      <div class="header-border" style="height: 100%;width: 80%;">MV分类</div>
    </div>
    <div class="header-border" style="flex: 3;">新歌推荐(2000)个</div>
  </div>
</template>

<script>
export default {
  name: "body-header"
}
</script>

<style lang="less">
.header-border {
  background-color: #CFCFCF;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
