import React, { useEffect, useState } from "react";
import axios from "axios";
import webApi from "../../Config/config";
 import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const ReviewDetail = () => {
  const apiUrl = webApi.apiUrl + "/getReviews";
  const [reviewIndex, setReviewIndex] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
const ImageUrl = "../../../public/review_avatar.png"
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewIndex.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviewIndex.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data && response.data.list) {
          setReviewIndex(response.data.list);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // Change the interval time as needed (e.g., every 5 seconds)

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [currentIndex]);

  return (
    <section className="p-5 mt-16 bg-primary-2 text-center">
      <div className="container mx-auto">
        <div className="p-3">
      
          <h2 className="font-sans font-bold text-4xl text-black">REVIEWS</h2>
        </div>

        <div className="relative flex justify-center items-center">
          <div
            className="absolute left-0 z-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            onClick={prevSlide}
          >
            <BsChevronCompactLeft size={30} />
          </div>
          <div
            className="absolute right-0 z-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            onClick={nextSlide}
          >
            <BsChevronCompactRight size={30} />
          </div>
          <div
            className="w-3/4 md:w-1/2 rounded-lg p-6 bg-white shadow-lg"
            style={{ zIndex: 10 }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={ImageUrl} // Replace "imageUrl" with the appropriate property name for the image URL in your review object
                alt="Review Image"
                className="mb-4"
                style={{ width: "30%", marginBottom: "auto" }}
              />
            </div>
            <p className="text-xl mb-4">{reviewIndex[currentIndex]?.name}</p>
            <p>{reviewIndex[currentIndex]?.review}</p>
            <div className="flex justify-center mt-4">
              {/* Add your star icon here */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2M12 4.38L9.47 10.05L3.76 12.36L8.52 16.6L7.5 22.64L12 19.77L16.5 22.64L15.5 16.6L20.24 12.36L14.53 10.05L12 4.38Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2M12 4.38L9.47 10.05L3.76 12.36L8.52 16.6L7.5 22.64L12 19.77L16.5 22.64L15.5 16.6L20.24 12.36L14.53 10.05L12 4.38Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2M12 4.38L9.47 10.05L3.76 12.36L8.52 16.6L7.5 22.64L12 19.77L16.5 22.64L15.5 16.6L20.24 12.36L14.53 10.05L12 4.38Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2M12 4.38L9.47 10.05L3.76 12.36L8.52 16.6L7.5 22.64L12 19.77L16.5 22.64L15.5 16.6L20.24 12.36L14.53 10.05L12 4.38Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2M12 4.38L9.47 10.05L3.76 12.36L8.52 16.6L7.5 22.64L12 19.77L16.5 22.64L15.5 16.6L20.24 12.36L14.53 10.05L12 4.38Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;
