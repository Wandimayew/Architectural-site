import React,{useState, useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CardDefault } from './Card';
import files from './Files';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';


const DesignCard = () => {
  // console.log("onShowMore type:", typeof onShowMore);
  const { setDesign } = useData();

  const navigate= useNavigate()
  const [isShowMore, setIsShowMore]= useState(false);
  const [detailsID, setDetailsID]= useState(null);
  const [detailsImage, setDetailsImage]= useState(null)
  const [detailsDesc, setDetailsDesc]= useState(null)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handleShowMoreOpen = (image) => {
    setDesign(image);
    console.log(image);
    // if (typeof onShowMore === 'function') {
    //   onShowMore("multiple", image);
      console.log("I am in the design card");
    // } else {
    //   console.log("onShowMore is not a function");
    // }
  };

  const handleInsideShowmoreOpen = (image) => {
    setDesign(image);
    console.log("Inside single show", image);
  };

  const handleShowMoreClose = () => {
    setIsShowMore(false);
  };
useEffect(()=>{
    handleShowMoreOpen();
},[])
  return (
    <>

<div id='/homepage/designs' className='h-1/3 flex flex-col gap-12 justify-between py-24 border-b-2 border-gray-900 border-dotted '>
      <h1 className='w-full flex justify-center text-2xl py-6 font-bold'><p className='shadow-xl rounded-lg  py-4 px-6'>Most Worked Design</p></h1>
    <div className='flex flex-1'>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true} // Disable autoplay for better mobile experience
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="transform 0.5s ease-in-out" // Smooth transform transition
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className='w-1/2 flex-1'
      >
       {files.map((image, index) => (
            <CardDefault key={index} image={image}  onShowMore={handleShowMoreOpen} />
          ))}
      </Carousel>

    </div>
    </div>









    {/* <div id='/homepage/designs' className='h-1/3 flex flex-col gap-12 justify-between py-24 border-b-2 border-gray-900 border-dotted '>
      <h1 className='w-full flex justify-center text-2xl py-6 font-bold'><p className='shadow-xl rounded-lg  py-4 px-6'>Most Worked Design</p></h1>
      {
      isShowMore && <div className='w-full flex justify-center items-center h-full'>
        <DesignDetail  detailID={detailsID} detailsImage={detailsImage} detailsDesc={detailsDesc} onClose={handleShowMoreClose} />
        </div>
    }
    <div className='flex flex-1'>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true} // Disable autoplay for better mobile experience
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="transform 0.5s ease-in-out" // Smooth transform transition
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className='w-1/2 flex-1'
      >
        {files.map((image, index) => (
          <CardDefault key={index} image={image}  onShowMore= {handleShowMoreOpen}/>
        ))}
      </Carousel>

    </div>
    </div> */}
  </>
  );
};

export default DesignCard;
