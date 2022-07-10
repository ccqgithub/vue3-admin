<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import CardChart from './CardChart/index.vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
  myChart = echarts.init(canvas.value!);

  myChart.setOption({
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '0%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6']
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          show: false
        }
      }
    },
    series: [
      {
        name: '日访问量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<template>
  <CardChart tip="访问量" chart>
    <template #meta>访问量</template>
    <template #total>8,846</template>
    <template #chart>
      <canvas ref="canvas"></canvas>
    </template>
    <template #label>日访问量</template>
    <template #number>1,234</template>
  </CardChart>
</template>
