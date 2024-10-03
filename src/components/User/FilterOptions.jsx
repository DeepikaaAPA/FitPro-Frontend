import React from "react";

const FilterOptions = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-2 bg-blue-50 rounded-lg  flex flex-wrap justify-between">
      <div className="w-full text-center mb-3">
        <label className=" p-5 ">
          {" "}
          <input
            className="w-1/3 h-11 border p-2"
            name="query"
            type="text"
            value={filters.query}
            onChange={handleInputChange}
            placeholder=" Search trainer or discipline ..."
          ></input>
          <button
            className="text-white bg-green-400 button rounded  p-2"
            onClick={handleInputChange}
          >
            {" "}
            <i className=" fa fa-search text-lg leading-lg " />
            <span className="inline-block ml-2">Search</span>
          </button>
        </label>
      </div>
      <div className=" w-2/12 mb-2 text-xs ">
        <label className="block  font-bold mb-2" htmlFor="language">
          Language
        </label>
        <select
          id="language"
          name="language"
          value={filters.language}
          onChange={handleInputChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">-- All --</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Kannada">Kannada</option>
          <option value="Urdu">Urdu</option>
          <option value="French">French</option>
        </select>
      </div>
      <div className="mb-2w-2/12  text-xs ">
        <label
          className="block text-gray-700 text-xs font-bold mb-2"
          htmlFor="price"
        >
          Max Price
        </label>
        <input
          type="range"
          id="price"
          name="price"
          min="0"
          max="5000"
          value={filters.price}
          onChange={handleInputChange}
          className="w-full"
        />
        <span className="text-gray-700 text-xs font-bold">
          <i className="fa fa-inr"></i>
          {filters.price}
        </span>
      </div>
      <div className="mb-2w-6/12  text-xs ">
        <label className="block text-gray-700 text-xs font-bold mb-2">
          Discipline
        </label>

        <div className="flex flex-wrap ">
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="all"
                checked={filters.all}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">All</span>
            </label>
          </div>
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="Yoga"
                checked={filters.Yoga}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Yoga</span>
            </label>
          </div>
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="Pilates"
                checked={filters.Pilates}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Pilates</span>
            </label>
          </div>
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="Zumba"
                checked={filters.Zumba}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Zumba</span>
            </label>
          </div>
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="Postpartum Fitness"
                checked={filters["Postpartum Fitness"]}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Postpartum Fitness</span>
            </label>
          </div>
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="Aerobics"
                checked={filters.Aerobics}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Aerobics</span>
            </label>
          </div>
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="Cardio"
                checked={filters.Cardio}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Cardio</span>
            </label>
          </div>
          <div className="px-2">
            <label>
              <input
                type="checkbox"
                name="Strength Training"
                checked={filters["StrengthTraining"]}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Strength Training</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
