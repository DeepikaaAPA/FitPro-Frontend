import React, { useEffect, useState } from "react";

import instance from "../../services/instance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Rating } from "@material-tailwind/react";

function Past() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/user/getTrainersReviews");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (<div>
    <h4 className="text-blue-400 text-center text-4xl "> Past Classes</h4>
    {!data.length?<p> You are yet to attend classes.</p>:data.map((trainer,index)=>(
        <div className="w-1/2 bg-blue-50 border ">


        </div>
    ))}
  </div>)
}

export default Past;
