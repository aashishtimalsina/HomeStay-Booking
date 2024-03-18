import React, { useEffect, useState } from "react";
import { activities } from "./constant";
import { image2 } from "../Constants";
import Button from "../reusuable/button";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../style";
import axios from "axios";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import webApi from "../../Config/config";

const Reviews = () => {
  const [review, setReview] = useState('');
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const encodedToken = encodeURIComponent(token);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const apiUrl = webApi.apiUrl + "/addReview";
  const handleSubmit = async (e) => {

    e.preventDefault();
    if(token === undefined){
        navigate('/login');
    }else{

    if (review.trim() === "") {
      setError(true); 
    } else {
      
    try {
      const response = await axios.post(
        apiUrl,
         {
            
              name:username,
                review: review,
            
        },
        {
            headers: {
                "ngrok-skip-browser-warning": true,
                Authorization: `Bearer ${encodedToken}`,
                "Content-Type": "application/json",
            }
        }
    );
      console.log(response.data); 
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }
}
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data) {
          console.log("Response data:", response.data);
        } else {
          setActivityData(response.data.list || []);
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-100">
    <div className=" p-20 pt-28  ">
      <div className="mb-9 ">
     
        <h1 className={`${styles.heading2} `}>Reviews</h1>
      </div>
    
      <div className=" flex justify-center mt-9">
  <div>
    <h1 style={{textAlign:'center'}}>Share Your Homestay Experience!</h1>
    <p style={{textAlign:'center'}}>Tell us about your stay. Your feedback helps us improve!</p>
    <br />
    <form onSubmit={handleSubmit}>
    <TextField fullWidth  label="Your Review"   error={error}  onChange={(e) => setReview(e.target.value)}  helperText={error ? "Review is required" : ""}/>
    <br />
    <br />
   
        <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onSubmit={handleSubmit}
                    // disabled={isSubmitting}
                  >
                    Submit 
                  </button>
                </div>
     </form>
  </div>
 
</div>
    </div>
    </section>
  );
};

export default Reviews;

{
  /* <div
  key={activity.id}
  className="   max-w-sm w-72  m-2 shadow-primary-1   bg-white shadow rounded-md overflow-hidden hover:scale-110 transition-transform"
>
  <div className="w-full h-56 ">
    <img src={`${activity.photo}`} className=" rounded-sm  h-full" />
  </div>

  <div className="flex justify-between  p-2 ">
    <h5 className="mb-2  text-xl font-bold tracking-tight  text-black dark:text-white">
      {activity.label}
    </h5>

    <p className="font-semibold font-lg text-primary-1  dark:text-gray-400">
      $ {activity.price}
    </p>
  </div>
  <div className="p-3">
    <Button name="Read More" width="full" />
  </div>
</div> */
}
