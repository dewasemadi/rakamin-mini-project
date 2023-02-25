import {createContext} from 'react'
import {TGetTodo} from 'services/todoService'

export const TodoContext = createContext<Array<TGetTodo>>([])
