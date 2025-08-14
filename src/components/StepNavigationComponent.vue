<template>
  <div class="steps">
    <div class="step active">1 SEARCH</div>
    <div class="step active">2 SELECT ROOM</div>
    <div class="step">3 CONTACT INFORMATION</div>
    <div class="step">4 CONFIRMATION</div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
/* Step Navigation */
.steps {
  display: flex;
  background: #f2f2f2;
  margin-bottom: 1rem;
}

.step {
  flex: 1;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #888;
}

.step.active {
  background: black;
  color: white;
}
</style>
