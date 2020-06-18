import {debounce} from "./utils";
import {BACKTOP_DISTANCE} from "common/const"
import BackTop from "components/content/backTop/BackTop";

//加载图片监听防抖
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh);
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh();
      refresh();
    };
    this.$bus.$on('imgLoad',this.itemImgListener);

  }
};
//图片加载监听
export const imgLoadMixin = {
  methods: {
    imgLoad() {
      this.$bus.$emit('imgLoad');
    }
  }
};

//回到顶部图标功能
export const backTopMixin = {
  data() {
    return {isShowBackTop: false}
  },
  components: {
    BackTop
  },
  methods: {
    //回到顶部点击事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //
    showBackTop(position) {
      //1. 判断backTop是否显示
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE;
    }
  }
};