import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import instance from "../../services/instance";
import { useLocation } from 'react-router-dom'
export default function TrainerProfile() {
  const location = useLocation();
  const { trainerIdProp } = location.state;
  console.log("prop", trainerIdProp);
  const { user } = useSelector((state) => state.user);
  const trainerId = trainerIdProp || user?.userId;
  console.log("trainerid", trainerId);
  const [data, setData] = useState({
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
  useEffect(() => {
    instance
      .get(`/trainer/get/${trainerId}`)
      .then((response) => {
        setData({ ...response.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the trainer data!", error);
      });
  }, [trainerId]);
  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-10 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={"http://localhost:3001/" + data.profilePic}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-green-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blue-400">
                          {data.experience}
                        </span>
                        <span className="text-sm text-gray-500">
                          Experience (yrs)
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blue-400">
                          10
                        </span>
                        <span className="text-sm text-gray-500">Rating</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blue-400">
                          89
                        </span>
                        <span className="text-sm text-gray-500">Trainees</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-4xl uppercase font-semibold leading-normal mb-2 text-blue-400 mb-2">
                    {data.firstname + " " + data.lastname}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold ">
                    <i className="fas fa-uniform-martial-arts"></i>{" "}
                    {data.disciplines.join(" - ")}
                  </div>
                  <div className="flex">
                    <div className=" w-1/2 mb-2 text-gray-700 mt-10 text-left border p-2 mr-2">
                      <div className="uppercase text-blue-400">
                        Qualifications:
                      </div>
                      {data.qualifications.map((q) => (
                        <>
                          <i className="fas fa-certificate mr-2 text-lg text-gray-500"></i>{" "}
                          {q} <br></br>
                        </>
                      ))}
                    </div>
                    <div className=" w-1/2 mb-2 text-gray-700 mt-10 text-left border p-2">
                      <div className="uppercase text-blue-400">Awards:</div>
                      {data.awards.map((award, index) => (
                        <div key={index}>
                          <i className="fas fa-trophy mr-2 text-lg text-gray-500"></i>{" "}
                          {award} <br></br>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-5 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        {data.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex  flex-wrap justify-center">
                  <div className=" w-3/12 rounded mb-2 bg-blue-400 text-gray-300 mt-10 text-center border p-2 mr-2">
                    <i className="fas fa-envelope mr-2 text-md "></i>{" "}
                    {data.email}
                  </div>
                  <div className=" w-3/12 rounded mb-2 bg-blue-400 text-gray-300 mt-10 text-center border p-2 mr-2">
                    <i className="fas fa-phone mr-2 text-md "></i> {data.phone}
                  </div>
                  <div className=" w-3/12 rounded mb-2 bg-blue-400 text-gray-300 mt-10 text-center border p-2 mr-2">
                    <i className="fas fa-language mr-2 text-md "></i>{" "}
                    {data.languages}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
