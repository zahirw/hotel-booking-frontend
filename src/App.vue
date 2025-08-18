<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getMe } from './services/auth/queries/user'
import { onMounted, watch } from 'vue'
import { useStore } from './stores'
import Cookies from 'js-cookie'

const store = useStore()

const fetchMe = () => {
  getMe()
    .then((res) => (store.currentUser = res))
    .catch((err) => {
      console.error(err)
      Cookies.remove('token')
      store.token = undefined
    })
}

onMounted(() => !!store.token && fetchMe())
watch([store.token], () => fetchMe())
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
