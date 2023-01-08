import api from './api'

export interface TCreateItem {
  todoId: number
  name: string
  progress_percentage: number
}

export interface TDeleteItem {
  todoId: number
  itemId: number
}

export interface TUpdateItem extends TDeleteItem {
  target_todo_id: number
  name: string
  progress_percentage: number
}

export const getItemsById = async (todoId: number): Promise<any> => await api.get(`/todos/${todoId}/items`)
export const createItemsById = async (data: TCreateItem): Promise<any> => {
  const { todoId, ...body } = data
  return await api.post(`/todos/${todoId}/items`, body)
}
export const updateItemsById = async (data: TUpdateItem): Promise<any> => {
  const { todoId, itemId, ...body } = data
  return await api.patch(`/todos/${todoId}/items/${itemId}`, body)
}
export const deleteItemsById = async (data: TDeleteItem): Promise<any> => {
  const { todoId, itemId } = data
  return await api.delete(`/todos/${todoId}/items/${itemId}`)
}
