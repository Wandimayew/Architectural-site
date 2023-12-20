import React,{useState} from 'react'
import AddDesign from './AddDesign';
import DesignList from './DesignList';
const Design = () => {
const [list, setList]=useState(false);
const [addDesign, setAddDesign]=useState(false);
const handleList=()=>{
  setList(true)
  setAddDesign(false)
}
const handleAdd=()=>{
  setAddDesign(true)
  setList(false)
}
  return(
    <>
    <div className='flex justify-evenly my-5 gap-10 h-auto'>
      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleAdd}>add design</button>
      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleList}>Design List</button>
    </div>
    {
      list && (<DesignList />)
    }
    {
      addDesign && (<AddDesign />)
    }
    </>
  )
}

export default Design