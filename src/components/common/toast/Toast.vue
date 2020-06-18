<template>
  <div class="toast">
    <div class="toast-msg" v-show="isShow">{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '当前商品数量+1',
        duration: 0,
        isShow: false
      }
    },
    methods:{
      showMessage(message, duration=2000) {
        this.message = message;
        this.isShow = true;
        setTimeout(()=>{
          this.message = '';
          this.isShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast-msg {
    position: fixed;
    white-space: nowrap;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 8px;
    font-size: 20px;
    border-radius: 12px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, .7);
    z-index: 999;
  }
</style>