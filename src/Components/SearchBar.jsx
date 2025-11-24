import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaBed, FaMoneyBillWave, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [searchData, setSearchData] = useState({
    checkIn: "",
    checkOut: "",
    roomType: "",
    priceMin: "",
    priceMax: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const validateDates = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!searchData.checkIn) {
      newErrors.checkIn = "Date d'arrivée obligatoire";
    } else if (searchData.checkIn < today) {
      newErrors.checkIn = "Date dans le passé";
    }

    if (!searchData.checkOut) {
      newErrors.checkOut = "Date de départ obligatoire";
    } else if (searchData.checkOut < today) {
      newErrors.checkOut = "Date dans le passé";
    }

    if (searchData.checkIn && searchData.checkOut && searchData.checkOut <= searchData.checkIn) {
      newErrors.checkOut = "Départ après arrivée";
    }

    return newErrors;
  };

  const handleSearch = () => {
    const validationErrors = validateDates();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const queryParams = new URLSearchParams();
    if (searchData.checkIn) queryParams.append('checkIn', searchData.checkIn);
    if (searchData.checkOut) queryParams.append('checkOut', searchData.checkOut);
    if (searchData.roomType) queryParams.append('roomType', searchData.roomType);
    if (searchData.priceMin) queryParams.append('priceMin', searchData.priceMin);
    if (searchData.priceMax) queryParams.append('priceMax', searchData.priceMax);

    navigate(`/results?${queryParams.toString()}`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Version Mobile */}
      <div className="md:hidden w-full">
        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full bg-white rounded-full shadow-xl px-6 py-4 flex items-center justify-center gap-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FaCalendarAlt className="text-blue-600" />
            <span>Rechercher une chambre</span>
            <FaSearch className="text-gray-400" />
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Arrivée */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-blue-600" /> Arrivée
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={searchData.checkIn}
                  onChange={handleChange}
                  min={today}
                  className={`border rounded-lg px-3 py-2 w-full text-sm ${
                    errors.checkIn ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>
                )}
              </div>

              {/* Départ */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-blue-600" /> Départ
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={searchData.checkOut}
                  onChange={handleChange}
                  min={searchData.checkIn || today}
                  className={`border rounded-lg px-3 py-2 w-full text-sm ${
                    errors.checkOut ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>
                )}
              </div>

              {/* Type Chambre */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <FaBed className="text-blue-600" /> Type
                </label>
                <select 
                  name="roomType"
                  value={searchData.roomType}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm"
                >
                  <option value="">Tous les types</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="standard">Standard</option>
                </select>
              </div>

              {/* Boutons Mobile */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleSearch}
                  className="flex-1 bg-gray-700 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <FaSearch />
                  Rechercher
                </button>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-3 text-gray-600 font-semibold rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Version Desktop */}
      <div className="hidden md:flex bg-white rounded-full shadow-xl px-4 lg:px-6 xl:px-8 py-4 lg:py-5 gap-3 lg:gap-4 xl:gap-6 items-end flex-wrap justify-center">
        {/* Arrivée */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2 text-xs lg:text-sm">
            <FaCalendarAlt className="text-blue-600" /> Arrivée
          </label>
          <input
            type="date"
            name="checkIn"
            value={searchData.checkIn}
            onChange={handleChange}
            min={today}
            className={`border rounded-lg px-2 lg:px-3 py-1 lg:py-2 w-32 lg:w-36 xl:w-40 text-sm ${
              errors.checkIn ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        </div>

        {/* Départ */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2 text-xs lg:text-sm">
            <FaCalendarAlt className="text-blue-600" /> Départ
          </label>
          <input
            type="date"
            name="checkOut"
            value={searchData.checkOut}
            onChange={handleChange}
            min={searchData.checkIn || today}
            className={`border rounded-lg px-2 lg:px-3 py-1 lg:py-2 w-32 lg:w-36 xl:w-40 text-sm ${
              errors.checkOut ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        </div>

        {/* Type Chambre */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2 text-xs lg:text-sm">
            <FaBed className="text-blue-600" /> Chambre
          </label>
          <select 
            name="roomType"
            value={searchData.roomType}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-2 lg:px-3 py-1 lg:py-2 w-32 lg:w-36 xl:w-40 text-sm"
          >
            <option value="">Tous les types</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="standard">Standard</option>
          </select>
        </div>

        {/* Prix Min */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2 text-xs lg:text-sm">
            <FaMoneyBillWave className="text-blue-600" /> Prix Min
          </label>
          <input
            type="number"
            name="priceMin"
            value={searchData.priceMin}
            onChange={handleChange}
            placeholder="500 000"
            min="0"
            className="border border-gray-300 rounded-lg px-2 lg:px-3 py-1 lg:py-2 w-32 lg:w-36 xl:w-40 text-sm"
          />
        </div>

        {/* Prix Max */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2 text-xs lg:text-sm">
            <FaMoneyBillWave className="text-blue-600" /> Prix Max
          </label>
          <input
            type="number"
            name="priceMax"
            value={searchData.priceMax}
            onChange={handleChange}
            placeholder="1 500 000"
            min="0"
            className="border border-gray-300 rounded-lg px-2 lg:px-3 py-1 lg:py-2 w-32 lg:w-36 xl:w-40 text-sm"
          />
        </div>

        {/* Bouton Recherche */}
        <button 
          onClick={handleSearch}
          className="bg-gray-700 hover:bg-gray-500 text-white font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-base transition-colors flex items-center gap-2"
        >
          <FaSearch />
          <span className="hidden lg:inline">Rechercher</span>
        </button>
      </div>
    </div>
  );
}