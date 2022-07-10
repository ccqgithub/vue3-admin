<script setup lang="ts">
import CardChart from './CardChart/index.vue';
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
  </CardChart>
</template>
