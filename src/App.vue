<template>
  <div id="main" @scroll="scrolling">
    <div class="container" ref="fcontainerRef" @scroll="scrolling">
      <WaterfallFlow :column="column" :gap="10"></WaterfallFlow>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, onUnmounted } from 'vue';
  import WaterfallFlow from './views/waterfall-flow.vue';
  const fcontainerRef = ref<HTMLDivElement | null>(null);
  const column = ref(4);
  const containerOberser = new ResizeObserver((e) => {
    changeColumn(e[0].target.clientWidth);
    console.log('container尺寸改变',column.value,e[0].target.clientWidth);
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
  const scrolling = () => {
    console.log('main滚动')
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
    overflow-y:scroll;
    margin: 8px;
    width: 100%;
    height: 100vh;
  }
  .container {
    width: 1400px;
    height: 100%;
  }
</style>
