<template>
  <div v-if="Object.keys(commentsInfo).length !== 0" class="comments-info">
    <div class="header-info clear-fix">
      <div class="header-title">用户评论</div>
      <div class="header-more">
        更多
        <i class="header-arrow"></i>
      </div>


    </div>
    <div class="comments-content">
      <div class="user-info">
        <img :src="commentsInfo.user.avatar" alt="">
        <span class="user-name">{{commentsInfo.user.uname}}</span>
      </div>
      <div class="user-comments">
        <p>{{commentsInfo.content}}</p>
       <div class="extra-info">
         <span class="comments-date">{{commentsInfo.created|dateFilter}}</span>
         <span class="product-info">{{commentsInfo.style}}</span>
         <div class="info-imgs">
           <img :src="item" alt=""  v-for="(item,index) in commentsInfo.images" :key="index">
         </div>
         <div class="vendor-reply">{{commentsInfo.explain}}</div>

       </div>

      </div>
    </div>

  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailCommentsInfo",
    props: {
      commentsInfo: {
        type: Object,
        default() {
          return {}
        }
      }

    },
    filters: {
      dateFilter(date) {
        let commentDate = new Date(date*1000);
        return formatDate(commentDate, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .comments-info {
    padding: 5px 12px;
    color: #333333;
    border-bottom: 5px solid #f2f5f8;

  }

  .header-info {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    font-size: 13px;
  }
  .header-title {
    float: left;
  }
  .header-more {
    float: right;
  }
  .header-arrow {
    border-top: 1px solid #999999;
    border-left: 1px solid #999999;
    width: 9px;
    height: 9px;
    background-color: transparent;
    display: inline-block;
    transform: rotate(135deg);
  }
  .comments-content  {
    padding: 10px 0 5px;
  }

  .user-info img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .user-info .user-name {
    position: relative;
    top: -12px;
    margin-left: 10px;
    font-size: 15px;
  }
  .user-comments {
    font-size: 14px;
    line-height: 1.5;
    color: #777;
  }
  .extra-info {
    padding: 0 5px 15px;
  }
  .comments-date, .product-info {
    margin-top: 10px;
    font-size: 12px;
    color: #999999;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 80px;
    height: 80px;
    margin-right: 5px;


  }
</style>