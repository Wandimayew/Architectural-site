import React, { useEffect, useState } from "react";
import Book from "./Book";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./customArrow.css";
import axios from "axios";
import AuthenticationModal from "./LoginModal";

const BookList = () => {
  const [files, setFiles]= useState([]);

  const [showModal, setShowModal]= useState(false)
  const [cartAdded, setCartAdded] = useState(true);
  const cartAddedBook = (name) => {
    // console.log(name);
    setCartAdded(true);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop2: {
      breakpoint: { max: 2000, min: 1200 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1200, min: 700 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet2: {
      breakpoint: { max: 700, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(()=>{
      const getBooks= async()=>{
        try {
          const response= await axios.get(`http://localhost:5000/book/getBooks`);
          if(response && response.data.success){
            console.log(response);
            const data=response.data.book;
            // console.log("data is",data);
            setFiles(data);
          }else{
            console.log("error to fetch");
          }
        } catch (error) {
          console.log("error to fetch");
          console.log(error);
        }
      }
      getBooks();
  },[])
  return (
    <div className=" w-full">
      <div className="flex-1">
        <h1 className="w-full flex justify-center text-3xl py-6 font-bold">
          <p className="font-sans  py-4 px-6">Books</p>
        </h1>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={false} // Disable autoplay for better mobile experience
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="transform 0.5s ease-in-out" // Smooth transform transition
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          customButton={
            <div className="carousel-arrows">
              <button className="custom-arrow-button">Left</button>
              <button className="custom-arrow-button">Right</button>
            </div>
          }
        >
          {files.map((book, index) => (
            <Book key={index} book={book} onAdd={cartAddedBook} onshow={toggleModal} />
          ))}
        </Carousel>
      </div>
                 {showModal && <AuthenticationModal onClose={toggleModal}/>}
    </div>
  );
};
export default BookList;
