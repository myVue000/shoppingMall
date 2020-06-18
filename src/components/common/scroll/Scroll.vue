<template>
  <div class="wrapper" ref="wp">
    <div class="content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      const wp = this.$refs.wp;
      this.scroll = new BScroll(wp, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      });
      //2. 监听滚动位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',position => {
          this.$emit('scrollPos', position);
        });
      }
      //3. 监听滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {

          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scrollTo && this.scroll.scrollTo(x,y,time);
      },
      finishPullUp() {
        this.scroll && this.finishPullUp && this.scroll.finishPullUp();
      },
      refresh() {
        // console.log('----');
        this.scroll && this.scroll.refresh && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>