<template>
  <div class="cart-list">
      <cart-list-item v-for="(item,index) in cartList"
                      :item-info="item"
                      :key="index"/>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components:{
      CartListItem,
    },
    computed:{
      ...mapGetters({
        cartList: 'getCartList'
      })
    },
  }
</script>

<style scoped>

</style>