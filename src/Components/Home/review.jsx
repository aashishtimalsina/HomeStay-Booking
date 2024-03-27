import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Rating, Select, TextField } from "@mui/material";
 
import Cookies from "js-cookie";
import webApi from "../../Config/config";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as yup from 'yup';
const Reviews = () => {
  const MySwal = withReactContent(Swal)
  const [review, setReview] = useState('');
  const [activityData, setActivityData] = useState([]);
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const encodedToken = encodeURIComponent(token);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const apiUrl = webApi.apiUrl + "/addReview";
  const apiUrl_fetch = webApi.apiUrl + "/activitiesDetails";
  const [ratingvalue, setRatingValue] = useState(0);
  const [activities, setActivities] = useState("");
  const schema = yup.object().shape({
    name: yup.string().required(),
    review: yup.string().required(),
    age: yup.number().positive().integer().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const handleSubmit = async (e) => {

    e.preventDefault();
  
    if(token === undefined || username == undefined){
        navigate('/login');
    }else{
     if (review === ""||ratingvalue ==="" || activities ===  "") {
      setError(true); 
    } else {
      
    try {
      const dataToSend={
        name:username,
        review: review, 
        activity_id: activities, 
        rating: ratingvalue, 
      }
     
       const response = await axios.post(
        apiUrl,
        dataToSend,
        {
            headers: {
                "ngrok-skip-browser-warning": true,
                Authorization: `Bearer ${encodedToken}`,
                "Content-Type": "application/json",
            }
        }
    );
      console.log(response.data); 
    
      return MySwal.fire({
        icon: 'success',
        title: 'Review Successful',
       });
      
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }
}
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl_fetch, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      });
      if (response.data) {
        setActivityData(response.data.list || []);
        console.log("Response data:", response.data);
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

useEffect(() => {
  fetchData()
  
  
},[])
 

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
    <form onSubmit={handleSubmit}   >
    <FormControl
                    fullWidth
                margin="normal"
                
              >
                <InputLabel id="hostName-label">Activities</InputLabel>
                <Select
                fullWidth
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={activities} 
                 label="Age"
                 onChange={(e)=>setActivities(e.target.value)}
                  
                >
                  {activityData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl>
    <TextField fullWidth  label="Your Review"   error={error}  onChange={(e) => setReview(e.target.value)}  helperText={error ? "Review is required" : ""}/>
    <br />
    <br />
    <div className="flex justify-center">
  
   <Rating
        name="simple-controlled"
        value={ratingvalue}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
      />
      </div>
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
