import api from './api'

export interface TTodo {
  title: string
  description: string
}

export const getTodos = async (): Promise<any> => await api.get('/todos')
export const createTodo = async (body: TTodo): Promise<any> => await api.post('/todos', body)
