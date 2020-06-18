<template>
 <div class="shop-cart">
   <nav-bar class="cart-top">
     <div slot="center">购物车({{length}})</div>
   </nav-bar>
   <scroll class="content" ref="scroll">
     <cart-list/>
   </scroll>
   <cart-bottom-bar />
 </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./subComps/CartList";
  import CartBottomBar from "./subComps/CartBottomBar";
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
      Scroll
    },
    computed: {
      ...mapGetters({
          length: 'getCartLength',
        })
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .shop-cart {
   height: 100vh;
  }
  .cart-top {
    background-color: var(--color-tint);
    color: white;
  }
  .content {
    height: calc(100% - var(--top-bar-height) - var(--bottom-tab-bar-height) - var(--bottom-cart-bar-height));
    overflow: hidden;
  }
</style>