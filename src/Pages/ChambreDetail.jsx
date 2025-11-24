import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { roomService } from "../services/roomService";

// Import des images
import room_1 from '../assets/room1.jpg';
import room_2 from '../assets/room2.jpg';
import room_3 from '../assets/room3-min.jpg';
import room_4 from "../assets/room4.jpg";
import room_5 from '../assets/room5.jpg';
import room_6 from "../assets/room6.jpg";
import room_7 from "../assets/room7.jpg";

// Mapping des images
const imageMap = {
  room_1, room_2, room_3, room_4, room_5, room_6, room_7
};

export default function ChambreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: ""
  });
  const [errors, setErrors] = useState({});

  // Date d'aujourd'hui pour validation
  const today = new Date().toISOString().split('T')[0];

  // Utilisation de React Query pour récupérer la chambre
  const { data: chambre, isLoading, error } = useQuery({
    queryKey: ['room', id],
    queryFn: () => roomService.getRoomById(id),
  });

  const validateDates = () => {
    const newErrors = {};
    
    if (!selectedDates.checkIn) {
      newErrors.checkIn = "La date d'arrivée est obligatoire";
    } else if (selectedDates.checkIn < today) {
      newErrors.checkIn = "La date d'arrivée ne peut pas être dans le passé";
    }

    if (!selectedDates.checkOut) {
      newErrors.checkOut = "La date de départ est obligatoire";
    } else if (selectedDates.checkOut < today) {
      newErrors.checkOut = "La date de départ ne peut pas être dans le passé";
    }

    if (selectedDates.checkIn && selectedDates.checkOut && selectedDates.checkOut <= selectedDates.checkIn) {
      newErrors.checkOut = "La date de départ doit être après la date d'arrivée";
    }

    return newErrors;
  };

  const handleDateChange = (field, value) => {
    setSelectedDates(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleReservation = () => {
    const validationErrors = validateDates();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    navigate(`/reservation?chambre=${chambre.id}&checkIn=${selectedDates.checkIn}&checkOut=${selectedDates.checkOut}`);
  };

  // États de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la chambre...</p>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Chambre non trouvée</h1>
          <p className="text-gray-600 mb-4">La chambre que vous recherchez n'existe pas.</p>
          <Link to="/chambres" className="text-blue-600 hover:underline">
            ← Retour aux chambres
          </Link>
        </div>
      </div>
    );
  }

  if (!chambre) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Chambre non trouvée</h1>
          <Link to="/chambres" className="text-blue-600 hover:underline">
            ← Retour aux chambres
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-10 px-4 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 md:mb-8 max-w-6xl mx-auto mt-20">
        <Link to="/chambres" className="text-blue-600 hover:underline text-sm md:text-base">
          ← Voir les autres chambres
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Image */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <img 
              src={imageMap[chambre.image]} 
              alt={chambre.title}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Informations */}
          <div className="space-y-6 md:space-y-8">
            {/* En-tête */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
                {chambre.title}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-green-600 font-bold mb-4 md:mb-6">
                {chambre.priceFormatted} / nuit
              </p>
              
              <div className="mb-4 md:mb-6">
                <span className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium ${
                  chambre.disponibilité ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {chambre.disponibilité ? '✅ Disponible' : '❌ Non disponible'}
                </span>
              </div>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {chambre.description}
              </p>
            </div>

            {/* Équipements */}
            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800">Équipements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {chambre.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-sm md:text-base">
                    <span className="text-green-500 mr-2 text-lg">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sélection des dates */}
            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800">
                Vérifier la disponibilité
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-6">
                <div>
                  <label className="block text-sm md:text-base font-medium mb-2 text-gray-700">
                    Arrivée
                  </label>
                  <input
                    type="date"
                    value={selectedDates.checkIn}
                    onChange={(e) => handleDateChange('checkIn', e.target.value)}
                    min={today}
                    className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                      errors.checkIn ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.checkIn && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">{errors.checkIn}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm md:text-base font-medium mb-2 text-gray-700">
                    Départ
                  </label>
                  <input
                    type="date"
                    value={selectedDates.checkOut}
                    onChange={(e) => handleDateChange('checkOut', e.target.value)}
                    min={selectedDates.checkIn || today}
                    className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                      errors.checkOut ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.checkOut && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">{errors.checkOut}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleReservation}
                disabled={!chambre.disponibilité}
                className={`w-full py-3 md:py-4 rounded-lg font-medium text-base md:text-lg transition-colors ${
                  chambre.disponibilité 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                {chambre.disponibilité ? 'Réserver maintenant' : 'Non disponible'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}