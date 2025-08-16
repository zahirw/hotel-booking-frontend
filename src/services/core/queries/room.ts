import apiClient from '@/services/axios'
import type { getRoomParamsType, getRoomsParamsType, getRoomsResponseType } from '../core.type'

export const getRooms = async (params: getRoomsParamsType) => {
  const res = await apiClient<getRoomsResponseType[]>({
    method: 'GET',
    url: '/api/rooms',
    params,
  })
  return res.data
}

export const getRoom = async (params: getRoomParamsType) => {
  const res = await apiClient<getRoomsResponseType>({
    method: 'GET',
    url: `/api/rooms/${params.id}`,
  })
  return res.data
}
