<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>

  #tab-bar {
    display: flex;
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    height: 49px;
    bottom: 0;
    left: 0;
    text-align: center;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
  }



</style>