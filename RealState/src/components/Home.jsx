import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import photo1 from '../assets/images/photo1.avif'
import photo2 from '../assets/images/photo2.avif'
import photo3 from '../assets/images/photo3.avif'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DesignCard from './DesignCard'
import BookList from './BookList'
import { useNavigate } from 'react-router-dom'
import { useData } from '../contexts/DataContext'

const Home = () => {
  const { setDesign} = useData();
  const navigate=useNavigate()
  const [showmore, setShowmore]= useState(false)
  const [showDesign, setShowDesign] = useState(false)
  const [showBooks, setShowBooks] = useState(false)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };


  // const handleShowMore = (image) => {
  //   console.log("show more");
  //   console.log(image);
  //   setDesign(image);
  //   navigate("/designs/details");
  // };
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