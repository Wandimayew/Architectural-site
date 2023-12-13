import React, { useState } from 'react'
import Book from './Book';
import files from './Files';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './customArrow.css'
import AddToCart from './AddToCart';

const BookList = () => {
    const [cartAdded, setCartAdded]= useState(false);
    const cartAddedBook=(name)=>{
        console.log(name);
        setCartAdded(true);
    }
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
      return (
        <div className=' w-full'>
            <div className='flex-1'>
            <h1 className='w-full flex justify-center text-2xl py-6 font-bold'><p className='shadow-xl rounded-lg  py-4 px-6'>Books</p></h1>
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
              <Book key={index} book={book} onAdd={cartAddedBook}/>
            ))}
          </Carousel>       
          </div>
                {
                    cartAdded && <div><AddToCart /> </div>
                }
        </div>
      );
}
export default BookList