import Header from 'components/header'
import React from 'react'
import CenterLayout from 'components/centerLayout'
import Spinner from 'components/spinner'
import {Show} from 'components/show'
import {getTodos, TGetTodo} from 'services/todoService'
import GroupCard from 'components/groupCard'
import BaseButton from 'components/baseButton'
import ArrowRight from 'assets/arrow-right.svg'
import ArrowLeft from 'assets/arrow-left.svg'
import {TodoContext} from 'context/todoContext'
import {useResponsive} from 'hooks/useResponsive'
import {getItemsById, updateItemsById} from 'services/itemService'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult} from 'react-beautiful-dnd'

export default function Todo() {
  let counter = 0
  const queryClient = useQueryClient()
  const {isDesktop} = useResponsive()
  const scrollRef = React.createRef() as React.MutableRefObject<HTMLDivElement>
  const colors = ['green', 'yellow', 'red', 'lime']
  const {data, isLoading: isTodosLoading} = useQuery<Array<TGetTodo>>('todos', getTodos)
  const todosData = data ?? []
  const getItemMutation = useMutation(getItemsById)
  const updateItemMutation = useMutation(updateItemsById)
  const onPrevClicked = () => {
    scrollRef.current.scrollLeft -= 1500
  }

  const onNextClicked = () => {
    scrollRef.current.scrollLeft += 1500
  }

  const onScrollToRight = () => {
    if (scrollRef) scrollRef.current.scrollLeft += Number.MAX_SAFE_INTEGER
  }

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result
    if (!destination) return

    const todoId = Number(source.droppableId)
    const itemId = Number(result.draggableId)
    const targetItemId = Number(destination.droppableId)

    getItemMutation.mutate(todoId, {
      onSuccess: (data) => {
        const item = data?.find((item: any) => item.id === itemId)

        const payload = {
          todoId: todoId,
          itemId: itemId,
          target_todo_id: targetItemId,
          name: String(item.name),
          progress_percentage: Number(item.progress_percentage),
        }

        updateItemMutation.mutate(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries(['items', todoId])
            queryClient.invalidateQueries(['items', targetItemId])
          },
        })
      },
    })
  }

  return (
    <div>
      <Header onScrollToRight={onScrollToRight}/><Show when={isTodosLoading}>
      <CenterLayout className='mt-[68px] max-sm:mt-[92px]'>
        <Spinner/>
      </CenterLayout>
    </Show>
      <Show when={todosData?.length === 0}>
        <CenterLayout className='mt-[68px] max-sm:mt-[92px]'>
          <p className='text-neutral-90 text-center'>No todos found</p>
        </CenterLayout>
      </Show>
      <div className='flex'>
        <Show when={isDesktop}>
          <BaseButton
            onClick={onPrevClicked}
            className='m-auto w-fit block rounded-full px-1 py-1 fixed top-[50%] left-5 shadow-lg'
            startIcon={ArrowLeft}
            variant='neutral'
          />
        </Show>

        <Show when={todosData?.length > 0}>
          <TodoContext.Provider value={todosData}>
            <div
              className='container mt-[68px] max-sm:mt-[92px] py-[24px] overflow-x-scroll md:no-scrollbar scroll-smooth scroll-mr-10'
              ref={scrollRef}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                <div className='grid gap-4 grid-flow-col pb-24'>
                  {todosData?.map(({id, title, description}: any, idx: number) => {
                    if (counter % 4 === 0) counter = 0
                    const color = colors[counter]
                    counter++
                    return (
                      <Droppable key={id} droppableId={id.toString()}>
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            <GroupCard
                              todoId={id}
                              title={title}
                              description={description}
                              color={color}
                              key={idx}
                              isDraggingOver={snapshot.isDraggingOver}
                              placeholder={provided.placeholder}
                            />
                          </div>
                        )}
                      </Droppable>
                    )
                  })}
                </div>
              </DragDropContext>
            </div>
          </TodoContext.Provider>
        </Show>

        <Show when={isDesktop}>
          <BaseButton
            onClick={onNextClicked}
            className='m-auto w-fit block rounded-full px-1 py-1 fixed top-[50%] right-5 shadow-lg'
            startIcon={ArrowRight}
            variant='neutral'
          />
        </Show>
      </div>
    </div>
  )
}
