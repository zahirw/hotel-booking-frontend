<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getMe } from './services/auth/queries/user'
import { onMounted } from 'vue'
import { useStore } from './stores'
import Cookies from 'js-cookie'

const store = useStore()
const isAuthenticated = !!Cookies.get('token')

onMounted(() => isAuthenticated && getMe().then((res) => (store.currentUser = res)))
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
