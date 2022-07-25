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
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  });
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<template>
  <CardChart tip="支付笔数" chart>
    <template #meta>支付笔数</template>
    <template #total>6,560</template>
    <template #chart>
      <canvas ref="canvas"></canvas>
    </template>
    <template #label>转化率</template>
    <template #number>60%</template>
  </CardChart>
</template>
