import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUserType } from '@/services/auth/auth.type'

export const useStore = defineStore('state', () => {
  const currentUser = ref<AuthUserType | undefined>(undefined)
  const token = ref<string>()

  return { currentUser, token }
})
