import apiClient from '@/services/axios'

import type { SigninParamsType, SigninResponseType } from '../auth.type'

export const signin = ({ email, password }: SigninParamsType) => {
  const url = 'api/login'
  const res = apiClient<SigninResponseType>({
    method: 'post',
    url,
    data: {
      email,
      password,
    },
  })
  return res
}
