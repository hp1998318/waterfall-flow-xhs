<template>
  <div id="water-card">
    <!-- <img :src="props.data?.url" class="img"  alt=""> -->
    <div class="img" :style="{height: props.height, backgroundColor: props.color}"></div>
    <div class="title">{{props.data?.title}}</div>
    <div class="user">
      <div class="left">
        <img class="user-img" :src="props.data?.avatar" alt="">
        <div class="user-name">{{props.data?.name}}</div>
      </div>
      <div class="right">
        <div class="icon"></div>
        <div class="num">{{props.data?.liked_count}}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { cardDataType } from '@/type/type';
  import { watch, type PropType } from 'vue';
  const props = defineProps({
    data: {
      type: Object as PropType<cardDataType>,
      default: () => ({} as cardDataType)
    },
    height: {
      type: String,
      default: () => ('')
    },
    color: {
      type: String,
      default: () => (''),
    }
  });
  watch(() => props.height, () => {
    console.log('高度',props.height)
  }, {immediate: true})
</script>
<style>
  #water-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    .img {
      /* height: 300px; */
      border: 1px solid #eee;
      border-radius: 20px;
    }
    .title {
      font-weight: 500;
      font-size: 14px;
      margin: 8px 0px 8px 0px;
      padding: 0px 12px 0px 12px;
      overflow: hidden;
      font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji,BlinkMacSystemFont,Helvetica Neue,Arial,PingFang SC,PingFang TC,PingFang HK,Microsoft Yahei,Microsoft JhengHei;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      /* line-height: 140%; */
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
      padding: 0px 12px 0px 12px;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 100%;
        }
        .user-name {
          margin-left: 8px;
          color: #333;
          line-height: 14px;
          font-weight: 500;
          font-size: 14px;
          font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji,BlinkMacSystemFont,Helvetica Neue,Arial,PingFang SC,PingFang TC,PingFang HK,Microsoft Yahei,Microsoft JhengHei;
          color: #333333CC;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .icon {
          width: 20px;
          height: 20px;
          background-image: url('../assets/like.png');
          background-size: 100%;
        }
        .num {
          height: 14px;
          font-size: 12px;
        }
      }
    }
  }
</style>
