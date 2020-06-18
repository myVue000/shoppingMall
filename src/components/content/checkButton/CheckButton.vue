<template>
  <div class="check-button" :class="{'isActive': isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
  }
</script>

<style scoped>
  .check-button {

    border-radius: 50%;
    border: 2px solid #cccccc;
    width: 18px;
    height: 18px;

  }
  .check-button img {

  }

  .isActive {
    background-color: #ff8198;
    border-color: #ff8198;
  }

</style>