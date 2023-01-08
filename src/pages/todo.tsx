import Header from 'components/header'
import React from 'react'
import CenterLayout from 'components/centerLayout'
import Spinner from 'components/spinner'
import { Show } from 'components/show'
import { useQuery } from 'react-query'
import { getTodos } from 'services/todoService'
import GroupCard from 'components/groupCard'
import BaseButton from 'components/baseButton'
import ArrowRight from 'assets/arrow-right.svg'
import ArrowLeft from 'assets/arrow-left.svg'
import { useResponsive } from 'hooks/useResponsive'

export default function Todo() {
  let counter = 0
  const { isDesktop } = useResponsive()
  const scrollRef = React.createRef() as React.MutableRefObject<HTMLDivElement>
  const colors = ['green', 'yellow', 'red', 'light-green']
  const { data, isLoading } = useQuery('todos', getTodos)
  const handlePrevBtnClick = () => {
    scrollRef.current.scrollLeft -= 1500
  }

  const handleNextBtnClick = () => {
    scrollRef.current.scrollLeft += 1500
  }

  return (
    <div>
      <Header />
      <Show when={isLoading}>
        <CenterLayout className='mt-[68px] max-sm:mt-[92px]'>
          <Spinner />
        </CenterLayout>
      </Show>
      <Show when={data?.length === 0}>
        <CenterLayout className='mt-[68px] max-sm:mt-[92px]'>
          <p className='text-neutral-90 text-center'>No todos found</p>
        </CenterLayout>
      </Show>
      <div className='flex'>
        <Show when={isDesktop}>
          <BaseButton
            onClick={handlePrevBtnClick}
            className='m-auto w-fit block rounded-full px-1 py-1 fixed top-[50%] left-5 shadow-lg'
            startIcon={ArrowLeft}
            variant='neutral'
          />
        </Show>

        <Show when={data?.length > 0}>
          <div
            className='container mt-[68px] max-sm:mt-[92px] py-[24px] overflow-x-scroll md:no-scrollbar scroll-smooth scroll-mr-10'
            ref={scrollRef}
          >
            <div className='grid gap-4 grid-flow-col pb-24'>
              {data?.map(({ id, title, description }: any, idx: number) => {
                if (counter % 4 === 0) counter = 0
                const color = colors[counter]
                counter++
                return (
                  <GroupCard todosData={data} id={id} title={title} description={description} color={color} key={idx} />
                )
              })}
            </div>
          </div>
        </Show>

        <Show when={isDesktop}>
          <BaseButton
            onClick={handleNextBtnClick}
            className='m-auto w-fit block rounded-full px-1 py-1 fixed top-[50%] right-5 shadow-lg'
            startIcon={ArrowRight}
            variant='neutral'
          />
        </Show>
      </div>
    </div>
  )
}
