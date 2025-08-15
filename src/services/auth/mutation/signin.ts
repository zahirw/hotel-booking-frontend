import apiClient from '@/services/axios'
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationReturnType,
} from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { SigninParamsType, SigninResponseType } from '../auth.type'

const signin = ({ email, password }: SigninParamsType): Promise<SigninResponseType> => {
  const url = 'api/login'
  return apiClient({
    method: 'post',
    url,
    data: {
      email,
      password,
    },
  })
}

export default function useSigninMutation(
  options: UseMutationOptions<SigninResponseType, AxiosError, SigninParamsType>,
): UseMutationReturnType<SigninResponseType, AxiosError, SigninParamsType, unknown> {
  return useMutation({
    mutationFn: (params: SigninParamsType) => signin({ ...params }),
    ...options,
  })
}
