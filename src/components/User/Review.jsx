import React, { useEffect, useState } from "react";

import instance from "../../services/instance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Rating } from "@material-tailwind/react";
import TrainerCard from "../Trainer/TrainerCard";
import ReviewCard from "./ReviewCard";

function Past() {
  const [data, setData] = useState([]);
const [initialData,setInitialData]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/user/getTrainersReviews");
        setData(response.data);
        setInitialData(response.data)
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReview=(e,index)=> {
  setData( data.map( (item, i)=> i===index? {...item,review:e.target.value}:item))
  console.log(data)
  }

  const handleSave=async (index)=>{
  const {trainerId,trainer,userId,user,review,rating}=data[index]
  await instance.post("/trainer/postReview",{trainerId,trainer,userId,user,review,rating})
  }
  const handleCancel=(index)=>{
    setData( data.map( (item, i)=> i===index? {...item,rating:e.target.value}:item))
  }
  const handleRating=(e,index)=>{
    setData( data.map( (item, i)=> i===index? {...item,rating:e.target.value}:item))
    console.log(data)
  }
  return (<div>
    <h4 className="text-blue-400 text-center text-4xl "> Past Classes</h4>
    <div className="flex flex-wrap ">
    {!data.length?<p> You are yet to attend classes.</p>:data.map((trainer,index)=>(
        <div className=" border m-3 bg-blue-50 ">
          <ReviewCard key={index} trainer={trainer.trainer} />

          <div className="p-2 pb-2 bg-yellow-100  text-sm flex flex-col ">
          <p className="text-lg font-bold text-gray-500"> Feedback :</p>
          <input type="number" value={trainer.rating} onChange={(e)=>handleRating(e,index)}/>
          <textarea className="text-gray-600 p-3 my-2" name="review" value={trainer.review } 
          onChange={(e)=>handleReview(e,index)}></textarea>
           <div className="text-center">
          <button className="button bg-blue-400 text-white  m-2 w-30 p-2 rounded " onClick={()=>handleSave(index)}>Save</button>
          <button className="button bg-gray-400 text-white m-2 w-30 p-2 rounded ">Cancel</button>
          </div>
           </div>
         </div>
    ))}</div>
  </div>)
}

export default Past;
