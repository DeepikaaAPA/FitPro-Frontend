// src/components/TrainerAccount.js
import React, { useState, useEffect } from "react";
import instance from "../../services/instance";
import { useSelector } from "react-redux";

const TrainerAccount = () => {
  const { user } = useSelector((state) => state.user);
  const trainerId = user?.userId;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    profilePic: "",
    disciplines: [],
    experience: "",
    description: "",
    images: [],
    video: "",
    price: "",
    languages: "",
    awards: [], // Add awards array
    qualifications: [],
  });

  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    instance
      .get(`/trainer/${trainerId}`)
      .then((response) => {
        console.log(response.data);
        setFormData({ ...formData, ...response.data });
        setInitialData(formData);
      })
      .catch((error) => {
        console.error("There was an error fetching the trainer data!", error);
      });
  }, [trainerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        disciplines: checked
          ? [...formData.disciplines, value]
          : formData.disciplines.filter((discipline) => discipline !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (formData.images.length < 10) {
      setFormData({ ...formData, images: [...formData.images, file] });
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const addAward = () => {
    setFormData({ ...formData, awards: [...formData.awards, ""] });
  };

  const handleAwardChange = (index, value) => {
    const updatedAwards = [...formData.awards];
    updatedAwards[index] = value;
    setFormData({ ...formData, awards: updatedAwards });
  };

  const removeAward = (index) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter((_, i) => i !== index),
    });
  };
  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [...formData.qualifications, ""],
    });
  };

  const handleQualificationChange = (index, value) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications[index] = value;
    setFormData({ ...formData, qualifications: updatedQualifications });
  };

  const removeQualification = (index) => {
    setFormData({
      ...formData,
      qualifications: formData.qualifications.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    //console.log(formData);
    const dpData = new FormData();
    dpData.append("profilePic", formData.profilePic);
    try {
      const res = await instance.post(`/trainer/dp/${trainerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", res);
    } catch (err) {
      console.log(err);
    }
    const data = new FormData();
    data.append("firstname", formData.firstname);
    data.append("email", formData.email);
    data.append("lastname", formData.lastname);
    data.append("disciplines", formData.disciplines);
    data.append("experience", formData.experience);
    data.append("phone", formData.phone);
    data.append("images", formData.images);
    data.append("profilePic", formData.profilePic);
    data.append("video", formData.video);
    data.append("price", formData.price);
    data.append("languages", formData.languages);
    data.append("awards", formData.awards);
    data.append("description", formData.description);
    data.append("qualifications", formData.qualifications);
    instance
      .post(`/trainer/${trainerId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Data saved successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
      });
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  return (
    <div className="p-4  text-blue-900 mx-3  bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-blue-400 font-bold mb-4">
        Trainer Account{" "}
      </h2>

      <div className="mb-4  ">
        <label className="block mb-1">First Name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100 text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Profile Picture</label>
        <input
          type="file"
          name="profilePic"
          onChange={(e) =>
            setFormData({ ...formData, profilePic: e.target.files[0] })
          }
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4 ">
        <label className="block mb-1">Disciplines</label>
        {/* Add checkboxes for disciplines here */}
        <div className="text-gray-500 ">
          <label className="px-2">
            <input
              type="checkbox"
              name="disciplines"
              value="Yoga"
              checked={formData.disciplines.includes("Yoga")}
              onChange={handleChange}
            />
            Yoga
          </label>
          <label className="px-2">
            <input
              type="checkbox"
              name="disciplines"
              value="Pilates"
              checked={formData.disciplines.includes("Pilates")}
              onChange={handleChange}
            />
            Pilates
          </label>
          <label className="px-2">
            <input
              type="checkbox"
              name="disciplines"
              value="StrengthTraining"
              checked={formData.disciplines.includes("StrengthTraining")}
              onChange={handleChange}
            />
            StrengthTraining
          </label>
          <label className="px-2">
            <input
              type="checkbox"
              name="disciplines"
              value="Cardio"
              checked={formData.disciplines.includes("Cardio")}
              onChange={handleChange}
            />
            Cardio
          </label>
          <label className="px-2">
            <input
              type="checkbox"
              name="disciplines"
              value="Zumba"
              checked={formData.disciplines.includes("Zumba")}
              onChange={handleChange}
            />
            Zumba
          </label>
          <label className="px-2">
            <input
              type="checkbox"
              name="disciplines"
              value="Aerobics"
              checked={formData.disciplines.includes("Aerobics")}
              onChange={handleChange}
            />
            Aerobics
          </label>
          <label className="px-2">
            <input
              type="checkbox"
              name="disciplines"
              value="Postpartum Fitness"
              checked={formData.disciplines.includes("Postpartum Fitness")}
              onChange={handleChange}
            />
            Postpartum Fitness
          </label>
          {/* Add more disciplines as needed */}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Experience</label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Images</label>
        {formData.images.map((image, index) => (
          <div key={index} className="mb-2">
            <img
              src={URL.createObjectURL(image)}
              alt={`Upload ${index}`}
              className="w-full"
            />
            <button onClick={() => removeImage(index)}>Remove</button>
          </div>
        ))}
        {formData.images.length < 10 && (
          <input
            type="file"
            name="images"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded text-gray-500"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Introductory Video</label>
        <input
          type="file"
          name="video"
          onChange={(e) =>
            setFormData({ ...formData, video: e.target.files[0] })
          }
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Languages</label>
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />

        <label className="block mb-1">Awards</label>
        {formData.awards.map((award, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={award}
              onChange={(e) => handleAwardChange(index, e.target.value)}
              className="w-full border p-2 rounded mr-2"
            />
            <button
              onClick={() => removeAward(index)}
              className="p-2 bg-red-400 text-white rounded"
            >
              x
            </button>
          </div>
        ))}
        <button
          onClick={addAward}
          className="p-2 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Languages</label>
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />

        <label className="block mb-1">Qualifications</label>
        {formData.qualifications.map((qualification, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={qualification}
              onChange={(e) => handleQualificationChange(index, e.target.value)}
              className="w-full border p-2 rounded mr-2"
            />
            <button
              onClick={() => removeQualification(index)}
              className="p-2 bg-red-400 text-white rounded"
            >
              x
            </button>
          </div>
        ))}
        <button
          onClick={addQualification}
          className="p-2 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCancel}
          className="mr-4 p-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TrainerAccount;
