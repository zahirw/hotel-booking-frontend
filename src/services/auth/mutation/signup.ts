import apiClient from '@/services/axios'
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationReturnType,
} from '@tanstack/vue-query'
import type { AxiosResponse, AxiosError } from 'axios'
import type { SignupParamsType, SignupResponseType } from '../auth.type'

const signup = ({
  email,
  password,
  name,
}: SignupParamsType): Promise<AxiosResponse<SignupResponseType>> => {
  const url = 'api/register'
  return apiClient({
    method: 'post',
    url,
    data: {
      email,
      password,
      name,
    },
  })
}

export default function useSignupMutation(
  options: UseMutationOptions<AxiosResponse<SignupResponseType>, AxiosError, SignupParamsType>,
): UseMutationReturnType<AxiosResponse<SignupResponseType>, AxiosError, SignupParamsType, unknown> {
  return useMutation({
    mutationFn: (params: SignupParamsType) => signup({ ...params }),
    ...options,
  })
}
