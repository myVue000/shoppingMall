<template>
  <div class="goods-list-item" @click="itemClick">
<!--    <img :src="getImage" alt="" @load="imgLoad">-->
    <img v-lazy="getImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collection">{{goodsItem.cfav}}</span>
    </div>
  </div>

</template>

<script>
  import {imgLoadMixin} from "common/mixin";

  export default {
    name: "GoodsListItem",
    mixins: [imgLoadMixin],
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      getImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      },
    },

    methods: {
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      },
    }
  }
</script>

<style scoped>
  .goods-list-item {
    width: 48%;
  }
  .goods-list-item img {
    width: 100%;
    height: 85%;
    padding: 0 3px;
    border-radius: 5px;

  }
  .goods-info {
    text-align: center;
    font-size: 12px;
  }
  .goods-info .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collection {
    position: relative;
  }
  .goods-info .collection::before {
    content: "";
    background: url("~assets/img/common/collect.svg") no-repeat 0 0/14px 14px;
    position: absolute;
    width: 14px;
    height: 14px;
    top: 1px;
    left: -15px;
  }

</style>