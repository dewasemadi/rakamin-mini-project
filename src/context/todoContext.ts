import { createContext } from 'react'
import { TGetTOdo } from 'services/todoService'

export const TodoContext = createContext<Array<TGetTOdo>>([])
