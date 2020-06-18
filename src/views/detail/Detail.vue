<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar" />
    <scroll class="content" ref="scroll" :probe-type="3" @scrollPos="scrollPos">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-detail-info @detailImageLoad='infoImageLoad' :detail-info="detailInfo"/>
      <detail-params-info ref="params" :params-info="paramsInfo"/>
      <detail-comments-info ref="comments" :comments-info="commentsInfo" />
      <detail-recon-info ref="recon" :recon-info="reconInfo"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart" />
    <toast />
  </div>
</template>

<script>
  import DetailNavBar from "./SubComps/DetailNavBar";
  import DetailSwiper from "./SubComps/DetailSwiper";
  import DetailBaseInfo from "./SubComps/DetailBaseInfo";
  import DetailShopInfo from "./SubComps/DetailShopInfo";
  import DetailDetailInfo from "./SubComps/DetailDetailInfo";
  import DetailParamsInfo from "./SubComps/DetailParamsInfo";
  import DetailCommentsInfo from "./SubComps/DetailCommentsInfo";
  import DetailReconInfo from "./SubComps/DetailReconInfo";
  import DetailBottomBar from "./SubComps/DetailBottomBar";
  import {getDetail, getRecon, GoodsInfo, Shop, Params} from "network/detail";
  import Scroll from "components/common/scroll/Scroll";
  import {mapActions} from 'vuex'
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {MARGIN_TOP_VALUE} from "common/const";
  import Toast from "components/common/toast/Toast";
  export default {
    name: "Detail",
    mixins: [
      itemListenerMixin,
      backTopMixin,
    ],

    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentsInfo: {},
        reconInfo: [],
        themeTopYs: [],
        currentIndex: 0,
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailDetailInfo,
      DetailParamsInfo,
      DetailCommentsInfo,
      DetailReconInfo,
      DetailBottomBar,
      Scroll,
      Toast
    },
    created() {
      this._getDetailData();
      this._getReconData();
    },
    mounted() {
      // this.infoImageLoad();
      // refreshLoad(this,'detailImgLoad',500);
    },
    destroyed() {
      this.$bus.$off('imgLoad',this.itemImgListener)
    },

    methods: {
      ...mapActions(['addCart']),
      _getDetailData() {
        //1. 获取iid
        this.iid = this.$route.params.iid;

        //2. 获取数据
        getDetail(this.iid).then(res => {
          // console.log(res.result);
          const data = res.result;
          this.topImages = data.itemInfo.topImages;
          //1.获取商品基本信息
          this.goods = new GoodsInfo(
              data.itemInfo,
              data.columns,
              data.shopInfo.services
          );
          //2. 获取店铺信息
          this.shop = new Shop(data.shopInfo);

          //3. 获取商品详细信息
          this.detailInfo = data.detailInfo;
          //4. 获取商品尺寸等参数信息
          this.paramsInfo = new Params(data.itemParams.info, data.itemParams.rule);
          //5. 获取评论信息
          if(data.rate.cRate !== 0) {
            this.commentsInfo = data.rate.list[0];
          }

        });
      },
      _getReconData() {
        getRecon().then(res => {
          this.reconInfo = res.data.list;
        })
      },
      _getOffsetTop() {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recon.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      _listenScrollTheme(position) {
        let themeLength = this.themeTopYs.length;
        // 方式1
        // for (let i = 0; i < themeLength; i++) {
        //   if(i<themeLength-1) {
        //     if (position >= this.themeTopYs[i] && position < this.themeTopYs[i+1]){
        //       if(this.currentIndex !== i) {
        //         this.currentIndex = i;
        //         this.$refs.detailNavBar.currentIndex = this.currentIndex;
        //       }
        //     }
        //   } else if(i === (themeLength-1) && position >= this.themeTopYs[i]) {
        //     if(this.currentIndex !== i) {
        //       this.currentIndex = i;
        //       this.$refs.detailNavBar.currentIndex = this.currentIndex;
        //     }
        //
        //   }
        //
        // }
        // 方式2
        for (let i = 0; i < themeLength - 1; i++) {
          if (this.currentIndex !== i && position >= this.themeTopYs[i] && position < this.themeTopYs[i+1]) {
            this.currentIndex = i;
            this.$refs.detailNavBar.currentIndex = this.currentIndex;
            break;
          }
        }
       },
      titleClick(index) {
        let y = -this.themeTopYs[index] + MARGIN_TOP_VALUE;
        this.$refs.scroll.scrollTo(0, y, 500);
      },
      infoImageLoad() {
        this.$refs.scroll.refresh();
        this._getOffsetTop();
      },
      scrollPos(position) {
        let posY = -position.y + MARGIN_TOP_VALUE;
        this.showBackTop(position); //混入函数 显示回到顶部图标
        this._listenScrollTheme(posY); //监听滚动 联动图标
      },
      addToCart() {
        //1. 获取购物车需要展示的数据
        let product = {};
        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        //2. 将商品添加到购物车 弹出Toast显示响应信息
        this.addCart(product).then(res => {
          this.$toast.showMessage(res);
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // });
      }
    }

  }
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: #ffffff;
    z-index: 9;
  }
  .content {
    height: calc(100vh - var(--top-bar-height) - var(--bottom-tab-bar-height));
    /*overflow: hidden;*/
  }
</style>