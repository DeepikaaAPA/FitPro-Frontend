import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@material-tailwind/react";
import instance from "../../services/instance";
const ApplicationForm = ({ user }) => {
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: "",
    discipline: "",
    experience: "",
    userId: user.userId,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await instance.post("/trainer/postApplication", {
        ...formData,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error?.response?.data?.message || "An error occured.");
    }
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl  text-center font-bold mb-4 text-blue-400">
        Application Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-200 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.firstname + " " + formData.lastname}
            readOnly
            className="w-full p-2 rounded bg-gray-800 text-blue-200 border border-blue-400"
          />
        </div>
        <div>
          <label className="block text-blue-200 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 rounded bg-gray-800 text-blue-200 border border-blue-400"
          />
        </div>
        <div>
          <label className="block text-blue-200 mb-2">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            className="w-full p-2 rounded bg-gray-800 text-blue-200 border border-blue-400"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-blue-200 mb-2" htmlFor="discipline">
            Discipline
          </label>
          <select
            id="discipline"
            name="discipline"
            value={formData.discipline}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-blue-200 border border-blue-400"
            required
          >
            <option value="">Select a discipline</option>
            <option value="Yoga">Yoga</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Pilates">Pilates</option>
            <option value="Aerobics">Aerobics</option>
            <option value="Zumba">Zumba</option>
            <option value="Postpartum Fitness">Postpartum Fitness</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-200 mb-2" htmlFor="experience">
            Experience (years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-blue-200 border border-blue-400"
            required
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
      {message != ""}?<Alert color="orange">{message}</Alert>:""
    </div>
  );
};

export default ApplicationForm;
