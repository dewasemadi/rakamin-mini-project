import api from './api'

export interface TLogin {
  email: string
  password: string
}

export interface TRegister extends TLogin {
  name: string
  password_confirmation: string
}

export const login = async (body: TLogin): Promise<any> => await api.post('/auth/login', body)
export const register = async (body: TRegister): Promise<any> => await api.post('/signup', body)
