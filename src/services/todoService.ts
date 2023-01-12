import api from './api'

export interface TUpdateTodo {
  title: string
  description: string
}

export interface TGetTOdo extends TUpdateTodo {
  id: number
  created_by: string
  created_at: string
  updated_at: string
}

export const getTodos = async (): Promise<Array<TGetTOdo>> => await api.get('/todos')
export const createTodo = async (body: TUpdateTodo): Promise<any> => await api.post('/todos', body)
