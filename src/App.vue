<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepAlive" :key="route.path" />
  </router-view>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style lang='less' scoped>
</style>