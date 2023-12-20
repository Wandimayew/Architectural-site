import React from 'react'
import DesignCard from './DesignCard'
import BookList from './BookList'

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-20  w-full h-auto">
      <DesignCard  />
      <BookList />
        </div>
    </>
  )
}
export default Home