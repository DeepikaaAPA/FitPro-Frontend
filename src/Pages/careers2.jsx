import RegisterBg from ".././assets/RegisterBg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../components/Trainer/ApplicationForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Careers() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleApplyNow = (e) => {
    e.preventDefault();
    try {
      alert("hi");
      const response = { data: { user: "admin" } }; //await axios.get("/api/current_user");
      if (response.data.user) {
        setShowForm(true);
        toast(
          "Apllication submitted. We will contact you in 10 business days."
        );
      } else {
        toast("Error!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>

      <div
        className="absolute top-0 w-full h-full bg-gray-900 opacity-20 "
        style={{
          backgroundImage: `url(${RegisterBg})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="bg-black p-6  shadow-md md:px-32">
        <h2 className="text-2xl font-bold mb-4 text-blue-100">
          Fitness Trainer Application Rules
        </h2>
        <p className="mb-2 text-blue-200">
          Join our team of expert trainers in disciplines such as Yoga, Cardio,
          Strength Training, Physiotherapy, Aerobics, Zumba, and Postpartum
          Fitness. To apply, please follow these guidelines:
        </p>
        <ul className="list-disc list-inside mb-4 text-blue-200">
          <li className="mb-2">
            Hold a relevant certification in your discipline.
          </li>
          <li className="mb-2">
            Have a minimum of 2 years of professional experience.
          </li>
          <li className="mb-2">
            Demonstrate excellent communication and motivational skills.
          </li>
          <li className="mb-2">
            Commit to ongoing professional development and training.
          </li>
          <li className="mb-2">Provide a clean bill of health and fitness.</li>
        </ul>
        <p className="mb-2 text-blue-200">
          We are looking for passionate and dedicated professionals who are
          committed to helping clients achieve their fitness goals. Apply now to
          be a part of our dynamic team!
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <form      onSubmit={handleApplyNow}>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            type="submit"
       
          >
            Apply Now
          </button>
        </form>

        {showForm && <ApplicationForm />}
      </div>
    </>
  );
}
