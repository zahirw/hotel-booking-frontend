import apiClient from '@/services/axios'
import type { getRoomsParamsType, getRoomsResponseType } from '../core.type'

export const getRooms = async (params: getRoomsParamsType) => {
  const res = await apiClient<getRoomsResponseType[]>({
    method: 'GET',
    url: '/api/rooms',
    params,
  })
  return res.data
}
