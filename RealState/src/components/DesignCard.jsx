import React,{useState, useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CardDefault } from './Card';
// import files from './Files';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import axios from 'axios';


const DesignCard = () => {
  const { setDesign } = useData();

  const [files, setFiles]= useState([]);
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
  };
  useEffect(()=>{
    const getDesign= async()=>{
      try {
        const response= await axios.get(`http://localhost:5000/design/getDesigns`);
        if(response && response.data.success){
          console.log(response);
          const data=response.data.design;
          console.log("data is",data);
          setFiles(data);
        }else{
          console.log("error to fetch");
        }
      } catch (error) {
        console.log("error to fetch");
        console.log(error);
      }
    }
    getDesign();
},[])

useEffect(()=>{
    handleShowMoreOpen();
    console.log(files,"there is the file");
},[])
  return (
    <>

<div id='/homepage/designs' className='h-1/3 flex relative flex-col gap-12 justify-between  border-gray-900  '>
      <h1 className='w-full flex justify-center text-3xl  font-bold'><p className='font-sans  py-4 px-6'>Most Worked Design</p></h1>
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
       {files.map((file, index) => (
            <CardDefault key={index} file={file}  onShowMore={handleShowMoreOpen} />
          ))}
      </Carousel>
    </div>
    </div>

  </>
  );
};

export default DesignCard;
