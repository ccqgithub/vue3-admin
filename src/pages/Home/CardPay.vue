<script setup lang="ts">
import CardChart from './CardChart/index.vue';
</script>

<template>
  <CardChart tip="支付笔数" chart>
    <template #meta>支付笔数</template>
    <template #total>6,560</template>
    <template #chart>
      <canvas></canvas>
    </template>
    <template #label>转化率</template>
    <template #number>60%</template>
  </CardChart>
</template>
