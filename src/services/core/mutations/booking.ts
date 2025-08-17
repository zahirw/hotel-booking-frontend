import apiClient from '@/services/axios'
import type {
  patchBookingRoomParamsType,
  patchBookingRoomResponseType,
  postBookingRoomParamsType,
  postBookingRoomResponseType,
} from '../core.type'

export const postBookingRooms = async (params: postBookingRoomParamsType) => {
  const res = await apiClient<postBookingRoomResponseType>({
    method: 'POST',
    url: '/api/bookings',
    data: params,
  })
  return res
}

export const patchBookingRooms = async (params: patchBookingRoomParamsType) => {
  const { contactId, id } = params
  const res = await apiClient<patchBookingRoomResponseType>({
    method: 'PATCH',
    url: `/api/bookings/${id}`,
    data: {
      contactId,
    },
  })
  return res
}

export const deleteBookingRooms = async (params: { id: string }) => {
  const { id } = params
  const res = await apiClient<patchBookingRoomResponseType>({
    method: 'DELETE',
    url: `/api/bookings/${id}`,
  })
  return res
}
