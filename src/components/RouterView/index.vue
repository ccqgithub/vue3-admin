<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="'fade'" mode="out-in">
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="Component" :key="route.path" />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </transition>
  </RouterView>
</template>
