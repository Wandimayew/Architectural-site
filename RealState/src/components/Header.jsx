import React, { useState, useEffect } from "react";
import photo1 from "../assets/images/photo1.avif";
import photo2 from "../assets/images/photo2.avif";
import photo3 from "../assets/images/photo3.avif";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sidebar from "./Sidebar";
import Navbar2 from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { role } = useAuth();
  const [showSecondNavbar, setShowSecondNavbar] = useState(false);
  const [activeTab, setActiveTab] = useState(true);

  const handleActiveChange = (tab) => {
    if (tab === "home" || tab === "design" || tab === "book") {
      setActiveTab(false);
      console.log("tab is in header", tab);
    } else {
      setActiveTab(true);
      console.log("other clicked");
    }
  };

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

  useEffect(() => {
    console.log("userjfhdjdfj", role);
    const handleScroll = () => {
      const imageSection = document.getElementById("image-section");
      if (imageSection) {
        const imageSectionBottom = imageSection.getBoundingClientRect().bottom;
        setShowSecondNavbar(imageSectionBottom <= 0);
        // setShowSecondNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-blue-gray-400">
      {!(role === "admin") && (
        <>
          <div
            id="image-section"
            className="h-[200px] lg:h-[300px] relative border-b-2 border-gray-900 w-full"
          >
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-20-px"
            >
              <img
                src={photo1}
                alt="image"
                className="h-[200px] lg:h-[300px] w-full object-fill"
              />
              <img
                src={photo2}
                alt="image"
                className="w-full h-[200px] lg:h-[300px] object-fill"
              />
              <img
                src={photo3}
                alt="image"
                className="w-full h-[200px] lg:h-[300px] object-fill"
              />
            </Carousel>
            <p className="absolute text-xl font-bold top-1/2 right-1/2">
              Slogan
            </p>
          </div>
          <div className="  w-full  -bottom-0 ">
            {!(role === "admin") && <Navbar2 activetab={handleActiveChange} />}
          </div>
          {!(role === "admin") && (
            <div
              className={`fixed z-40 bg-blue-gray-400 py-2 top-0 w-full ${
                showSecondNavbar ? "block" : "hidden"
              }`}
            >
              <Sidebar />
              <Navbar2 activetab={handleActiveChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
