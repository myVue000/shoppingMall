<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 @tabClick="tabClick"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @scrollPos="scrollPos">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <home-recon-view :recon="recon"/>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   ref="tabControl2"
                   @tabClick="tabClick"/>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from "./subComps/HomeSwiper";
  import HomeReconView from "./subComps/HomeReconView";
  import HomeFeatureView from "./subComps/HomeFeatureView";
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import {getHomeMultiData, getHomeGoods} from 'network/home';
  // import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import Scroll from "components/common/scroll/Scroll";
  import {POP,NEW,SELL} from "common/const";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeReconView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [
      itemListenerMixin,
      backTopMixin
    ],

    data() {
      return {
        banner: [],
        recon: [],
        currentType: POP,
        tabOffsetTop: 0,
        saveY: 0,
        isTabFixed: false,
        itemImgListener: null,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        }
      }
    },
    created() {
      // 1. 请求多个数据
      this._getHomeMultiData();
      this._getHomeGoods(POP);
      this._getHomeGoods(NEW);
      this._getHomeGoods(SELL);
    },
    mounted() {
      // 1. 获取tab Control的offsetTop
      //所有组件都有一个属性$el: 用于获取组件中的DOM元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      // console.log(this.tabOffsetTop);
      //2.监听GoodsListItem中图片加载 刷新使得better scroll重新计算可滚动高度
      // this.itemImgLoad();
    },
    activated () {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY);
    },
    deactivated () {
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('imgLoad',this.itemImgListener)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*
        事件监听相关方法
      */
      //1. 切换标签
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP;
            break;
          case 1:
            this.currentType = NEW;
            break;
          case 2:
            this.currentType = SELL
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index
      },
      //2. 回到顶部点击事件 --- 移入混入
      // backClick() {
      //   this.$refs.scroll.scrollTo(0 ,0, 500);
      // },
      //3. 监听滚动位置
      scrollPos(position) {
        //1. 混入函数 是否显示回到顶部图标
        this.showBackTop(position);
        //2. 决定tabControl是否吸顶
        this.isTabFixed = (- position.y) > this.tabOffsetTop;
      },
      //4. 加载更多图片
      loadMore() {
        this._getHomeGoods(this.currentType);
        // this.$refs.scroll.refresh(); //解决 better-scroll bug
      },
      //5. 监听图片加载 解决better-scroll bug 或者使用混入如简化代码
      // itemImgLoad() {
      //   const delay = 50;
      //   const refresh = debounce(this.$refs.scroll.refresh, delay);// 调用防抖函数
      //   this.itemImgListener =() => {
      //     // this.$refs.scroll.refresh();
      //     refresh();
      //   };
      //   this.$bus.$on('imgLoad',this.itemImgListener);
      // },
      //6. 监听轮播图加载
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /*
       网络请求相关方法
      */
      _getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banner = res.data.banner.list;
          this.recon = res.data.recommend.list;
        });
      },
      _getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page++;
          this.$refs.scroll.finishPullUp();
        })
      },
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;

  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    width: 100%;
  }
  /*.tab-control {*/
  /*  */
  /*  !*由于使用better-scroll吸顶效果失效*!*/
  /*  */
  /*  !*吸顶效果*!*/
  /*  !*position: sticky;*!*/
  /*  !*top: 44px;*!*/
  /*  !*z-index: 9;*!*/
  /*}*/

  /*定义可滚动范围*/
  /*方式1*/
  /*.content {*/
  /*  height: calc(100vh - 93px);*/
  /*}*/

  /*定义可滚动范围*/
  /*方式2*/
  .content {
    overflow: hidden;
    position: absolute;
    top: var(--top-bar-height);
    bottom: var(--bottom-tab-bar-height);
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>