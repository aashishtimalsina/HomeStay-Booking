import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { slides } from "./constant";

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

  return (
    <section className="p-5 mt-16 bg-primary-2">
      <div className="p-3">
        <p className="text-primary-4 mt-14 font-semibold text-sm mb-2">
          DISCOVER OUR MEMORIES
        </p>
        <h2 className={` font-sans font-bold text-4xl text-black`}>GALLERY</h2>
      </div>

      <div className="relative flex justify-center items-center">
        <img
          src={
            slides[currentIndex === 0 ? slides.length - 1 : currentIndex - 1]
              .url
          }
          alt={`slide-${currentIndex - 1}`}
          className="w-36 h-36 md:w-48 md:h-48 object-cover absolute left-80 transform -translate-x-full rounded-lg"
        />
        <img
          src={slides[currentIndex].url}
          alt={`slide-${currentIndex}`}
          className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-lg z-10"
        />
        <img
          src={
            slides[currentIndex === slides.length - 1 ? 0 : currentIndex + 1]
              .url
          }
          alt={`slide-${currentIndex + 1}`}
          className="w-36 h-36 md:w-48 md:h-48 object-cover absolute right-80 transform translate-x-full rounded-lg"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        >
          <BsChevronCompactLeft size={30} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        >
          <BsChevronCompactRight size={30} />
        </button>
      </div>
    </section>
  );
};

export default Gallery;
