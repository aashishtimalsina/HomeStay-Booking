import React, { useEffect, useState } from "react";
import Card from "./cards";
import webApi from "../../Config/config";
import axios from "axios";
import { useParams } from "react-router-dom";


const Host = () => {
  const { id } = useParams();
  const [host, setHost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = webApi.apiUrl + '/getHostDetails';
       try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
         if (response.data) {
           setHost(response.data.list || null);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <section>
      {/* <Navbar /> */}
       <Card  props={host}/>
     </section>
  );
};

export default Host;
