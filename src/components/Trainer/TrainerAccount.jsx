import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainerAccount = ({ trainerId }) => {
  const [trainer, setTrainer] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [introVideo, setIntroVideo] = useState(null);
  const [specialization, setSpecialization] = useState('');
  const [price, setPrice] = useState('');
  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState('');

  useEffect(() => {
    instance.get(`/api/trainers/${trainerId}`)
      .then(response => {
        setTrainer(response.data);
        setSpecialization(response.data.specialization || '');
        setPrice(response.data.price || '');
        setAwards(response.data.awards || []);
      })
      .catch(error => {
        console.error('There was an error fetching the trainer data!', error);
      });
  }, [trainerId]);

  const handleProfilePicUpload = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleIntroVideoUpload = (e) => {
    setIntroVideo(e.target.files[0]);
  };

  const handleAddAward = () => {
    setAwards([...awards, newAward]);
    setNewAward('');
  };

  const handleSaveChanges = () => {
    const updatedTrainer = {
      ...trainer,
      specialization,
      price,
      awards,
    };

    axios.put(`/api/trainers/${trainerId}`, updatedTrainer)
      .then(response => {
        alert('Changes saved successfully!');
      })
      .catch(error => {
        console.error('There was an error saving the changes!', error);
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Trainer Profile</h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <p>{trainer.name}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p>{trainer.email}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <p>{trainer.phone}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Brand Name</label>
        <p>{trainer.brandName}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input type="file" onChange={handleProfilePicUpload} />
        <input type="text" placeholder="Or enter image URL" className="mt-2 p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Introductory Video</label>
        <input type="file" onChange={handleIntroVideoUpload} />
        <input type="text" placeholder="Or enter video URL" className="mt-2 p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Specialization & Services</label>
        <textarea
          className="mt-2 p-2 border rounded w-full"
          placeholder="Describe your specialization and services"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price per Hour</label>
        <input
          type="number"
          className="mt-2 p-2 border rounded w-full"
          placeholder="Enter your hourly rate"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Awards & Recognitions</label>
        <input
          type="text"
          value={newAward}
          onChange={(e) => setNewAward(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
          placeholder="Enter award or recognition"
        />
        <button onClick={handleAddAward} className="mt-2 p-2 bg-blue-500 text-white rounded">Add Award</button>
        <ul className="mt-2">
          {awards.map((award, index) => (
            <li key={index} className="mt-1">{award}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSaveChanges} className="mt-4 p-2 bg-green-500 text-white rounded">Save Changes</button>
    </div>
  );
};

export default TrainerAccount;
