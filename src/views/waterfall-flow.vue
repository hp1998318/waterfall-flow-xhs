<template>
	<div id="water-flow-box" ref="containerRef">
    <div ref="listRef" class="list-container">
      <WaterCard 
        v-for="(i,v) in state.cardInfos"
        :data="i" 
        :height="state.imageHeight[v] + 'px'"
        :color="colorArr[v % colorArr.length]"
        :style="{width: state.cardWidth + 'px',transform: `translate3d(${state.x[v]}px,${state.y[v]}px,0)`}"
        >
      </WaterCard>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getDataList } from '@/api/getList';
  import type { cardDataType } from '@/type/type';
  import WaterCard from '@/components/water-card.vue';
  import { ref, reactive, watch, computed, onMounted, nextTick, onUnmounted} from 'vue';
  const props = defineProps({
    column: {
      type: Number,
      default: 0
    },
    gap: {
      type: Number,
      default: 10
    }
  })
  const colorArr = ["#409eff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"];
  const containerRef = ref<HTMLDivElement | null>(null);
  const listRef = ref<HTMLDivElement | null>(null);
  const containerOberser = new ResizeObserver((e) => {
    handleSize();
  })
  type stateType = {
    cardWidth: number,
    imageHeight: Array<number>,
    cardInfos: cardDataType[],
    cardHeight: Array<number>,
    columnHeight: Array<number>
    x: Array<number>,
    y: Array<number>
  }
  let list: cardDataType[] = [];
  const state = reactive<stateType>({
    cardWidth: 0,
    imageHeight: [],
    cardInfos: [],
    cardHeight: [],
    columnHeight: new Array(props.column).fill(0),
    x: [],
    y: []
  });
  const getData = async () => {
    list = await getDataList();
    state.cardInfos = [...state.cardInfos,...list];
    handleSize();
  }
  const minColumn = computed(() => {
    let minIndex = -1;
    let minHeight = Infinity;
    state.columnHeight.forEach((i,v) => {
      if(i <= minHeight) {
        minIndex = v;
        minHeight = i;
      }
    })
    console.log('min',minHeight,minIndex);
    return {
      minHeight,
      minIndex
    }
  })
  const handleSize = () => { 
    // 计算宽度
    const clientWidth = containerRef.value?.clientWidth!;
    state.cardWidth = (clientWidth - (props.gap * (props.column - 1))) / props.column;
    console.log('卡片宽度',state.cardWidth);
    list.forEach((i,v) => {
      // 计算图片高度
      const imgHeight = state.cardWidth * (i.height / i.width);
      state.imageHeight[v] = imgHeight;
      // 计算卡片总高度
      nextTick(() => {
        const cardHeight = listRef.value?.children[v].clientHeight!;
        state.cardHeight[v] = cardHeight!;
        // 计算偏移量(卡片的位置)
        if(v < props.column) {
          const curX = v * (state.cardWidth + props.gap);
          state.x[v] = curX;
          state.columnHeight[v] = state.cardHeight[v] + props.gap;
          state.y[v] = 0;
        } else {
          const { minHeight, minIndex } = minColumn.value;
          const curX = minIndex * (state.cardWidth + props.gap);
          state.x[v] = curX;
          state.y[v] = minHeight;
          state.columnHeight[minIndex] = state.columnHeight[minIndex] + cardHeight + props.gap;
        }
      })
    })
    console.log('size',state,props.column)
  }
  onMounted(() => {
    containerRef.value && containerOberser.observe(containerRef.value);
  });
  onUnmounted(() => {
    containerOberser.unobserve(containerRef.value!);
  })
  getData();
  // watch(() => props.column, () => {
  //   handleSize();
  // },{immediate: true})
</script>
<style>
  #water-flow-box {
    .list-container {
      position: relative;
      transition: all 0.5s;
    }
  }
</style>
