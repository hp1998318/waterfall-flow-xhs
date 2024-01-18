<template>
  <div id="main">
    <div class="container" ref="fcontainerRef">
      <WaterfallFlow :column="column" :gap="10"></WaterfallFlow>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import WaterfallFlow from './views/waterfall-flow.vue';
  const fcontainerRef = ref<HTMLDivElement | null>(null);
  const column = ref(4);
  const containerOberser = new ResizeObserver((e) => {
    changeColumn(e[0].target.clientWidth);
    console.log('container尺寸改变',column.value);
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
  onMounted(() => {
    containerOberser.observe(fcontainerRef.value!);
  })

</script>
<style scoped>
  #main {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
  .container {
    width: 1400px;
  }
</style>
