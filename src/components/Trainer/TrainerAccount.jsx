import React, { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../services/instance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import ImageUploader from "./ImageUploader";
const cloudinary_upload_url =
  "https://api.cloudinary.com/v1_1/dzmpy0ilo/upload";
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
    awards: [],
    qualifications: [],
  });

  const [initialData, setInitialData] = useState({});
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    instance
      .get(`/trainer/get/${trainerId}`)
      .then((response) => {
        setFormData({ ...formData, ...response.data });
        setProfilePic(response.data.profilePic);
        setInitialData(response.data);
        console.log(formData);
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
  const handleDpSave = async () => {
    const data = new FormData();

    data.append("file", formData.profilePic);
    data.append("upload_preset", "pcotrgbw");

    try {
      const response = await axios.post(cloudinary_upload_url, data);
      console.log(response.data);
      const url = response.data.secure_url;
      await instance.post("/trainer/dp/updateDp", { url });
      setProfilePic(url);
      toast(" Profile Picture changed. ");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    //console.log(formData);
    instance
      .post(`/trainer/update/${trainerId}`, formData)
      .then((response) => {
        toast("Changes saved.");
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
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl text-blue-400 font-bold mb-4">
        Trainer Account Settings{" "}
      </h2>

      <div className="mb-4  ">
        <label className="block mb-1">First Name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="text-sm w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="text-sm w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="text-sm w-full border p-2 rounded text-gray-500"
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
        <div className="flex flex-wrap">
          <img
            src={profilePic}
            className="w-20 h-20 rounded-full border border-blue-400 bg-blue-300 p-1"
          ></img>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => {
              setFormData({ ...formData, profilePic: e.target.files[0] });
            }}
            className="text-sm w-1/2 border p-2 rounded text-gray-500"
          />
          <button
            className="rounded bg-blue-400 text-white p-1"
            onClick={handleDpSave}
          >
            {" "}
            Upload{" "}
          </button>
        </div>
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
          className="text-sm w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="text-sm w-full border p-2 rounded text-gray-500"
        />
      </div>

      {/* <div className="mb-4">
        <label className="block mb-1">Images</label>
        {formData.images?.map((image, index) =>
          image ? (
            <div key={index} className="mb-2">
              <img src={image} alt={`Upload ${index}`} className="h-20 w-20" />
              <button
                className="text-white rounded small  bg-red-500 p-1 "
                onClick={() => removeImage(index)}
              >
                {" "}
                - Remove
              </button>
            </div>
          ) : (
            <input type="file"></input>
          )
        )}
      </div> */}

      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="text-sm w-full border p-2 rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Languages</label>
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="text-sm w-full border p-2 rounded text-gray-500"
        />

        <label className="block mb-1">Awards</label>
        {formData.awards.map((award, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={award}
              onChange={(e) => handleAwardChange(index, e.target.value)}
              className="text-gray-700 text-sm w-full border p-2 rounded mr-2"
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
        <label className="block mb-1">Qualifications</label>
        {formData.qualifications.map((qualification, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={qualification}
              onChange={(e) => handleQualificationChange(index, e.target.value)}
              className="text-gray-700 text-sm w-full border p-2 rounded mr-2"
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
