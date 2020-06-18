<template>
  <div class="recon">
    <div class= recon-item v-for="item in recon">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeReconView",
    props: {
      recon: {
        type: Array,
        default() {
          return []
        }

      }

    }
  }
</script>

<style scoped>
  .recon {
    display: flex;
    width: 100%;
    padding: 10px 0 15px;
    border-bottom: 8px solid #eeeeee;
  }
  .recon-item {
    flex: 1;
    text-align: center;
    font-size: 12px;

  }
  .recon-item img {
    width: 90%;
    margin-bottom: 10px;
  }
</style>