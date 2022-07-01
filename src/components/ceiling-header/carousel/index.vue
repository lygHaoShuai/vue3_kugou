<template>
  <div class="block">
    <el-carousel loop autoplay height="508px">
      <el-carousel-item v-for="(item,index) in slideImg" :key="index">
        <img :src="item.imageUrl" alt="" style="width: 100%;height: 100%" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "carousel",
  props: {
    slideImg: Array
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

:deep(.el-icon) {
  font-size: 50px;
}
:deep(.el-carousel__arrow) {
  height: 60px;
  width: 60px;
}
:deep(.el-carousel__button) {
  height: 15px;
  width: 15px;
  border-radius: 50%;
}
</style>
