import { useEffect, useState } from "react";
import instance from "../services/instance";
import TrainerCard from "../components/Trainer/TrainerCard";
export default function Browse() {
    const [trainers,setTrainers]=useState([])
  useEffect(() => {
   
    const fetch = async () => {
      try {
        const response = await instance.get("/trainer/all");
        setTrainers(response.data)
       
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);


  return (
    <div className="App">


        <div className="flex flex-wrap">
          {trainers.map((trainer, index) => (
            <TrainerCard key={index} trainer={trainer} />
          ))}
        </div>
 
    </div>
  );
}
