<template>
  <div class="recon-info">
    <div class="info-header">热门推荐</div>
    <grid-view>
      <goods-list-item class="list-item" v-for="(item,index) in reconInfo" :goods-item="item" :key="index">
      </goods-list-item>
    </grid-view>
  </div>
</template>

<script>
  import GridView from "components/common/gridview/GridView";
  import GoodsListItem from "components/content/goods/GoodsListItem";
  export default {
    name: "DetailReconInfo",
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      reconInfo: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recon-info {
    padding: 5px;
  }
  .info-header {
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
  .list-item {
    flex: 1;
    align-content: space-evenly;
  }
</style>