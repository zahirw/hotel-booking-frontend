import apiClient from '@/services/axios'
import type {
  getContactByIdResponseType,
  postContactParamsType,
  postContactResponseType,
} from '../core.type'

export const postContact = async (params: postContactParamsType) => {
  const res = await apiClient<postContactResponseType>({
    method: 'POST',
    url: '/api/contacts',
    data: params,
  })
  return res
}

export const getContactById = async (params: { id: string }) => {
  const res = await apiClient<getContactByIdResponseType>({
    method: 'GET',
    url: `/api/contacts/${params.id}`,
  })
  return res
}
