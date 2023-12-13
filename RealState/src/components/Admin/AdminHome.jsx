import React, {  useState } from 'react'
import {FaCartPlus} from 'react-icons/fa'
import photo1 from '../../assets/images/photo1.avif'
import photo2 from '../../assets/images/photo2.avif'
import photo3 from '../../assets/images/photo3.avif'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AdminNavbar from './AdminNavbar'

const AdminHome = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

const [search, setSearch] = useState(null)
const handleSearchChange=(e)=>{
  setSearch(e.target.value)
}
  return (
    <>
     <div className="fixed top-0 z-50  w-full px-2 md:px-10 bg-white">
        <div className="flex items-center my-1 justify-center gap-5">
          <input
            className="border-2 pl-10 text-gray-500 flex justify-center items-center border-solid rounded-full border-gray-900 w-1/2 h-10 lg:w-3/5"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search...."
          />
          <div className="flex w-1/2 md:hidden justify-evenly lg:justify-end lg:gap-10 items-center gap-2">
            <FaCartPlus size={30} />
            <button className="border-2 shadow-md w-16 border-solid rounded-full h-fit">Login</button>
            <button className="border-2 shadow-md w-20 border-solid rounded-full h-fit">Sign Up</button>
          </div>
          <div className="w-1/2 hidden md:flex justify-evenly lg:justify-end lg:gap-10 lg:w-1/3">
            <p>Name</p>
            <p>LOGO</p>
          </div>
        </div>
      </div>
      <div className='h-[250px] lg:h-[400px] relative border-b-2 border-gray-900  w-full'>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true} // Enable autoplay on all devices
        autoPlaySpeed={5000} // Set a slower autoplay speed
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500} // Faster transition duration
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-20-px" // Adjust padding for better mobile view
      >
        <img src={photo1} alt='image' className=' h-[250px] lg:h-[400px] w-full object-fill' />
        <img src={photo2} alt='image' className='w-full h-[250px] lg:h-[400px] object-fill' />
        <img src={photo3} alt='image' className='w-full h-[250px] lg:h-[400px] object-fill' />
      </Carousel>
        <p className='absolute text-xl font-bold top-1/2 right-1/2'>Slogan</p>
      </div>
      <div className='w-full flex justify-center'>

      <AdminNavbar />
      </div>
    </>
  )
}
export default AdminHome