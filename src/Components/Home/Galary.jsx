import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { slides } from "./constant";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  console.log("state", currentIndex);
  console.log("slide index", slides[currentIndex].url);

  return (
    <section className="p-5 mt-16 bg-primary-2">
      <div className="p-3">
        <p className="text-primary-4 mt-14 font-semibold text-sm mb-2">
          DISCOVER OUR MEMORIES
        </p>
        <h2 className={` font-serif font-bold text-4xl text-black`}>GALLERY</h2>
      </div>
      <div className=" m-auto py-16 px-4 relative group">
        <div className="w-full h-full rounded-2xl duration-500">
          <img
            src={slides[currentIndex].url}
            alt="photo"
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          />
        </div>
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        >
          <BsChevronCompactLeft size={30} />
        </button>
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        >
          <BsChevronCompactRight size={30} />
        </button>
        <div className="flex top-4 justify-center py-2">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentIndex ? "text-blue-500" : ""
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
