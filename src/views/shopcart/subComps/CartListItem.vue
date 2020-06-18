<template>
  <div class="cart-list-item">
    <div class="checked-box">
      <check-button
              :isChecked="itemInfo.checked"
              @click.native="chkClick"/>
    </div>
    <div class="item-image">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="item-bottom">
        <div class="item-price">￥{{itemInfo.price}}</div>
        <div class="item-count">X{{itemInfo.count}}</div>
      </div>

    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props:{
      itemInfo: {
        type: Object,
        default() {
          return {}
        }

      }
    },
    methods: {
      chkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>

  .checked-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
 .cart-list-item {
   border-bottom: 1px solid #999999;
   display: flex;
   padding: 5px;
 }
  .item-image {
    padding: 5px;
  }
  .item-image img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    padding: 5px;
    overflow: hidden;
  }
 .item-info .item-title, .item-info .item-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333333;
   margin-top: 5px;
 }

 .item-info .item-desc {
   margin-top: 10px;
   color: #666666;
   font-size: 14px;
  }
  .item-bottom {
    margin-top: 20px;
    display: flex;
  }
  .item-bottom .item-price {
    color: orangered;
    flex: 1;
  }
</style>