<template>
  <div v-if="Object.keys(paramsInfo).length !== 0" class="params-info">
    <div class="params-title">参数信息</div>
    <table v-for="(parts, index) in paramsInfo.sizes" :key="index" class="params-sizes">
      <tr v-for="(part, indey) in parts" :key="indey">
        <td v-for="(size, indez) in part" :key="indez">
          {{size}}
        </td>
      </tr>

    </table>
    <table class="other-params">
      <tr v-for="(info, index) in paramsInfo.info" :key="index">
        <td class="info-key">{{info.key}}</td>
        <td class="info-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-image" v-if="paramsInfo.image.length !== 0">
      <img :src="paramsInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamsInfo",
    props: {
      paramsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

  .params-info {
    padding: 0 15px 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .params-title {
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .params-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .params-info table tr {
    height: 42px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .other-params {
    border-top: 1px solid rgba(100,100,100,.1);
  }
  .info-key {
    width: 95px;
  }
  .info-value {
    color: #eb4868;
  }

  .info-image img {
    width: 100%;
  }

</style>