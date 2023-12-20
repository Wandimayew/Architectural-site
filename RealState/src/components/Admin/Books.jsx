import React, { useState } from "react";
import AddBook from "./AddBook";
import BookList from "./BookList";

const Books = () => {
  const [list, setList]=useState(false);
const [addBook, setAddBook]=useState(false);
  const handleAddBook=()=>{
    setAddBook(true)
    setList(false)
  }
  const handleBookList=()=>{
    setList(true)
    setAddBook(false)
  }
return(
  <div>
    <div className='flex justify-evenly my-5 gap-10 h-auto'>
    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleAddBook}>add book</button>
    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleBookList}>book list</button>
    </div>
    {
      list && (
        <BookList />
      )
    }
    {
      addBook && (
        <AddBook />
      )
    }
  </div>
)
};

export default Books;