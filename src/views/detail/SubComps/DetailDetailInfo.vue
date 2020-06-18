<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detail-info">
    <div class="detail-desc clear-fix">
      <div class="desc-start"></div>
      <div class="desc-info">{{detailInfo.desc}}</div>
      <div class="desc-end"></div>
    </div>
    <div class="image-desc">{{detailInfo.detailImage[0].key}}</div>
    <div class="detail-images"
         v-for="item in detailInfo.detailImage[0].list">
      <img :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
  import {imgLoadMixin} from "common/mixin";
  export default {
    name: "DetailDetailInfo",
    mixins: [imgLoadMixin],
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
        return {
          imagesCount: 0,
          imagesLength: 0
        }
    },
    methods: {
      imgLoad() {
        if(++this.imagesCount === this.imagesLength) {
            this.$emit('detailImageLoad');
            // this.$bus.$emit('imgLoad');
        }
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length;
      }
    }
  }
</script>

<style scoped>
  .detail-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .detail-desc {
    padding: 0 15px;
  }
  .desc-info {
    font-size: 14px;
    padding: 15px 0;
  }
  .desc-start, .desc-end {
    width: 90px;
    height: 1px;
    position: relative;
    background-color: #a3a3a5;
  }
  .desc-start {
    float: left;
  }
  .desc-end {
    float: right;
  }
  .desc-start::before, .desc-end::after {
    content: '';
    width: 5px;
    height: 5px;
    background-color: #333333;
    position: absolute;
    bottom: 0;
  }
  .desc-end::after {
    right: 0;
  }

  .image-desc {
    font-size: 15px;
    color: #333333;
    margin: 10px 0 10px 15px;
  }
  .detail-images img{
    width: 100%;
  }

</style>