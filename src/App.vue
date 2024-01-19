<template>
  <div id="main">
    <div class="container" ref="fcontainerRef"  @scroll="scrollToBottom">
      <WaterfallFlow :column="column" :gap="10" ref="waterfall"></WaterfallFlow>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, onUnmounted, nextTick } from 'vue';
  import WaterfallFlow from './views/waterfall-flow.vue';
  const fcontainerRef = ref<HTMLDivElement | null>(null);
  const waterfall = ref<any>(null);
  const column = ref(4);
  const page = ref(1);
  const containerOberser = new ResizeObserver((e) => {
    changeColumn(e[0].target.clientWidth);
    // console.log('container尺寸改变',column.value,e[0].target.clientWidth);
  })
  const changeColumn = (width: number) => {
    if (width > 960) {
      column.value = 5;
    } else if (width >= 690 && width < 960) {
      column.value = 4;
    } else if (width >= 500 && width < 690) {
      column.value = 3;
    } else {
      column.value = 2;
    }
  };
  const scrollToBottom = () => {
    const { scrollTop, clientHeight, scrollHeight } = fcontainerRef.value!;
    if(scrollHeight - clientHeight - scrollTop === 0) {
      page.value++;
      waterfall.value.getData(page.value);
      console.log('滚动到底部',page.value);
    }
  }
  onMounted(() => {
    fcontainerRef.value && containerOberser.observe(fcontainerRef.value);
  })
  onUnmounted(() => {
    containerOberser.unobserve(fcontainerRef.value!);
  })
</script>
<style scoped>
  #main {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }
  .container {
    width: 1400px;
    height: 100%;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
