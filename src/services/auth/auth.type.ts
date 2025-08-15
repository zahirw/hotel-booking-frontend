export type SignupParamsType = {
  email: string
  password: string
  name: string
}

export type SignupResponseType = {
  message: string
}

export type SigninParamsType = {
  email: string
  password: string
}

export type AuthUserType = {
  id: number | null
  name: string
  email: string
}

export type SigninResponseType = {
  token: string
  user: AuthUserType
}
