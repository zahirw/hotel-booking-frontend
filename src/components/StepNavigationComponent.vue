<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="steps">
    <div class="step" :class="{ active: route.path === '/' }">1 SEARCH</div>
    <div class="step" :class="{ active: route.path === '/select-room' }">2 SELECT ROOM</div>
    <div class="step" :class="{ active: route.path === '/contact-information' }">
      3 CONTACT INFORMATION
    </div>
    <div class="step" :class="{ active: route.path === '/booking-confirmation' }">
      4 CONFIRMATION
    </div>
  </div>
</template>

<style scoped>
.steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  height: 3px;
  width: 100%;
  background: #e5e5e5;
  transform: translateY(-50%);
  z-index: 1;
}

.step {
  flex: 1;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: #888;
  position: relative;
  z-index: 2;
}

.step::before {
  content: '';
  display: block;
  margin: 0 auto 0.5rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e5e5e5;
  line-height: 22px;
}

.step.active {
  color: #000;
  font-weight: bold;
}

.step.active::before {
  background: black;
}
</style>
