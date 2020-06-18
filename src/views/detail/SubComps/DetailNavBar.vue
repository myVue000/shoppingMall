<template>
  <div>
    <nav-bar class="detail-nav">
      <div class="back-icon" slot="left">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div class="detail-nav-titles" slot="center">
        <div class="title" v-for="(item,index) in titles"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data() {
      return {
        currentIndex: 0,
        titles: ['商品','参数', '评论','推荐']
      }
    },

    components: {
      NavBar
    },

    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    background-color: #ffffff;
    position: relative;
    z-index: 9;
  }
  .back-icon {
    position: relative;
  }
  .back-icon img {
    position: absolute;
    top: 10px;
    left: 25px;
  }

  .detail-nav-titles {
    display: flex;
    font-size: 13px;
  }
  .title {
    flex: 1
  }
  .active {
    color: var(--color-high-text);
  }

</style>