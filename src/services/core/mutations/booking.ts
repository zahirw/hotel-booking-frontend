import apiClient from '@/services/axios'
import type {
  getBookingByIdParamsType,
  getBookingByIdResponseType,
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

export const getBookingById = async (params: getBookingByIdParamsType) => {
  const res = await apiClient<getBookingByIdResponseType>({
    method: 'GET',
    url: `/api/bookings/${params.id}`,
  })
  return res
}
