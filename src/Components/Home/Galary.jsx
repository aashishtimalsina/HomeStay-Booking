import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import axios from "axios";
import webApi from "../../Config/config";
import Cookies from "js-cookie";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [Homestay, setHomestay] = useState([]);
  const apiUrls = webApi.apiUrl + "/getHomeStayInfo/1";

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Homestay.galleryImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Homestay.galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const role = Cookies.get("role");
    const token = Cookies.get("token");

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrls, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data) {
          setHomestay(response.data.homestay_details || []);
          console.log("getHomeStayInfo:", response.data.homestay_details);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="p-5 mt-16 bg-primary-2">
      <div className="p-3">
        <p className="text-primary-4 mt-14 font-semibold text-sm mb-2">
          DISCOVER OUR MEMORIES
        </p>
        <h2 className={`font-sans font-bold text-4xl text-black`}>GALLERY</h2>
      </div>
      {Homestay.galleryImages && Homestay.galleryImages.length > 0 && (
        <div className="relative flex justify-center items-center">
          <img
            src={
              Homestay.galleryImages[
                currentIndex === 0
                  ? Homestay.galleryImages.length - 1
                  : currentIndex - 1
              ]
            }
            alt={`slide-${currentIndex - 1}`}
            className="w-36 h-36 md:w-48 md:h-48 object-cover absolute left-80 transform -translate-x-full rounded-lg"
          />
          <img
            src={Homestay.galleryImages[currentIndex]}
            alt={`slide-${currentIndex}`}
            className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-lg z-10"
          />
          <img
            src={
              Homestay.galleryImages[
                currentIndex === Homestay.galleryImages.length - 1
                  ? 0
                  : currentIndex + 1
              ]
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
      )}
    </section>
  );
};

export default Gallery;