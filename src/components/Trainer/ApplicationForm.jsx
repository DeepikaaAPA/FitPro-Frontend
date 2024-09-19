import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discipline: "",
    experience: "",
    certification: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Application submitted. We will contact you wihin 10 business days.");
    // form submission logic 
    


    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl  text-center font-bold mb-4 text-blue-400">
        Application Form
      </h2>
      <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-200 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-blue-200 border border-blue-400"
            required
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
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-blue-200 border border-blue-400"
            required
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
            <option value="Physiotherapy">Physiotherapy</option>
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
        <div>
          <label className="block text-blue-200 mb-2" htmlFor="certification">
            Certification
          </label>
          <input
            type="text"
            id="certification"
            name="certification"
            value={formData.certification}
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
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
