import apiClient from '@/services/axios'
import type {
  getBookingByIdParamsType,
  getBookingByIdResponseType,
  getBookingsParamsType,
} from '../core.type'

export const getBookingById = async (params: getBookingByIdParamsType) => {
  const res = await apiClient<getBookingByIdResponseType>({
    method: 'GET',
    url: `/api/bookings/${params.id}`,
  })
  return res
}

export const getBookings = async (params: getBookingsParamsType) => {
  const res = await apiClient<getBookingByIdResponseType[]>({
    method: 'GET',
    url: `/api/bookings`,
    params,
  })
  return res
}
