<script setup lang="ts">
import CardChart from './CardChart/index.vue';
</script>

<template>
  <CardChart tip="总销售额">
    <template #meta>总销售额</template>
    <template #total>¥ 126,560</template>
    <template #trend1>周同比</template>
    <template #trendText1>12%</template>
    <template #trend2>日同比</template>
    <template #trendText2>11%</template>
    <template #label>日销售额</template>
    <template #number>￥12,423</template>
  </CardChart>
</template>
