<template>
  <div class="bottom-bar">
    <div class="check-area">
    <check-button class="check-button" @click.native="btnClick" :isChecked="isSelectAll"/>
    <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计: {{totalPrice}}</span>
    </div>
    <div class="calculate">去计算: ({{getLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from "vuex"
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      btnClick() {
        if (!this.isSelectAll) {
          let nonClickItem = this.cartList.filter(item => !item.checked);
          nonClickItem.forEach(item => item.checked = true);
        }else {
          this.cartList.forEach(item =>item.checked = false)
        }
      }
    },

    computed: {
      ...mapGetters({
        cartList: 'getCartList'
      }),
      totalPrice() {
        return '￥' + this.cartList.filter(item => item.checked)
            .reduce((totalVal, item) => {
              totalVal += item.price * item.count;
              return totalVal
            }, 0).toFixed(2)
      },
      getLength() {
        return this.cartList.filter(item => item.checked)
            .reduce((total, item)=>{
              total += item.count;
              return total
            }, 0)
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false;
        return !this.cartList.some(item => !item.checked)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    align-items: center;
    height: 40px;
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eeeeee;
    font-size: 14px;
  }
  .check-area {
    display: flex;
    align-items: center;
    height: 40px;
    margin-left: 5px;
    flex: 1;

  }
  .check-area .check-button {
    margin-right: 5px;
  }
  .total-price {
    flex: 2;
  }
  .calculate {
    flex: 1;
    height: 40px;
    background-color: orangered;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
  }

</style>