<script setup lang="ts">
import { useAttrs } from 'vue'

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const attrs = useAttrs()

const getVariantClass = () => {
  switch (props.variant) {
    case 'secondary':
      return 'btn-secondary'
    case 'danger':
      return 'btn-danger'
    default:
      return 'btn-primary'
  }
}
</script>

<template>
  <button
    v-bind="attrs"
    :type="props.type || 'button'"
    class="btn"
    :class="getVariantClass()"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  width: 100%;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background 0.25s,
    transform 0.1s;
}
.btn-primary {
  background: #4a90e2;
}

.btn-primary:hover {
  background: #357ab8;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #4caf50;
}
.btn-secondary:hover {
  background: #3e8e41;
  transform: translateY(-1px);
}

.btn-danger {
  background: #e74c3c;
}
.btn-danger:hover {
  background: #c0392b;
  transform: translateY(-1px);
}
</style>
