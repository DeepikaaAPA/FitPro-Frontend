import { useEffect, useState } from "react";
import instance from "../services/instance";
import TrainerCard from "../components/Trainer/TrainerCard";
import FilterOptions from "../components/User/FilterOptions";
export default function Browse() {
  const [trainers, setTrainers] = useState([]);
  const [filters, setFilters] = useState({
    query: "",
    language: "",
    price: 500,
    Yoga: false,
    Pilates: false,
    "Strength Training": false,
    Zumba: false,
    "Postpartum Fitness": false,
    Cardio: false,
    Aerobics: false,
    all: true,
  });
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await instance.get("/trainer/all");
        setTrainers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await instance.post("/trainer/search", { filters });
        setTrainers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [filters]);
  return (
    <div className="App">
      <FilterOptions filters={filters} setFilters={setFilters} />
      <div className="flex flex-wrap">
        {!trainers.length && (
          <div className="text-center text-xl text-blue-400">
            {" "}
            No results found.
          </div>
        )}
        {trainers.map((trainer, index) => (
          <TrainerCard key={index} trainer={trainer} />
        ))}
      </div>
    </div>
  );
}
