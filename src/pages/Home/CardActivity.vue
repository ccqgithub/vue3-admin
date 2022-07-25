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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  });
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<template>
  <CardChart tip="运营活动效果" chart footer-trend>
    <template #meta>运营活动效果</template>
    <template #total>78%</template>
    <template #trend1>周同比</template>
    <template #trendText1>12%</template>
    <template #trend2>日同比</template>
    <template #trendText2>11%</template>
    <template #label>日销售额</template>
    <template #number>￥12,423</template>
    <template #chart>
      <canvas ref="canvas"></canvas>
    </template>
  </CardChart>
</template>
