import apiClient from '@/services/axios'
import type { AuthUserType } from '../auth.type'
export const getMe = async () => {
  const res = await apiClient<AuthUserType>({
    method: 'GET',
    url: '/api/me',
  })
  return res.data
}
