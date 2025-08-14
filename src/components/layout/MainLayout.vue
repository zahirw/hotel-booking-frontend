<script setup lang="ts">
import HeaderComponentLayout from './HeaderComponent.layout.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="main-layout">
    <HeaderComponentLayout />
    <RouterView />
  </main>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1rem;
}
</style>
