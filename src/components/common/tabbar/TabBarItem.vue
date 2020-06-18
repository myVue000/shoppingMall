<template>
  <div class="tab-bar-item"  @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot class="item-text" name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // this.isActive = true;
        if(this.$route.path === this.path) return;
        this.$router.push(this.path);
        this.currentIndex = 0;
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    border-right: #cccccc 1px solid;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }
  .tab-bar-item:last-child {
    border-right: none;
  }
  .item-text {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 3px;
    color: #333;
  }
</style>