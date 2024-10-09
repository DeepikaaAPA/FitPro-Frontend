import cloudinary from "cloudinary-core";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cloudinary_upload_url =
  "https://api.cloudinary.com/v1_1/dzmpy0ilo/upload";

export default function ImageUploader({ trainerId }) {
  const [images, setImages] = useState();
  const handleFileChange = (e) => {
    setImages(e.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("file", images);
    formData.append("upload_preset", "pcotrgbw");

    console.log(formData);
    try {
      const response = await axios.post(cloudinary_upload_url, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}

      <input
        type="file"
        name="file"
        id="file"
        required
        onChange={handleFileChange}
      />
      <button
        className="button rounded bg-green-300 text-gray-400"
        onClick={handleUpload}
      >
        {" "}
        Upload Images{" "}
      </button>
    </div>
  );
}
