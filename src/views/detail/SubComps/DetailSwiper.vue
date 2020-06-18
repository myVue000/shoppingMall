<template>
    <swiper class="swiper-box">
      <swiper-item class="top-images" v-for="item in topImages">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>



</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index"
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-box {
    height: 300px;
  }

</style>