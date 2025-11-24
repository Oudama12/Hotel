import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaBed, FaMoneyBillWave } from "react-icons/fa";
import { roomService } from "../services/roomService";

// Import des images
import room_1 from '../assets/room1.jpg';
import room_2 from '../assets/room2.jpg';
import room_3 from '../assets/room3-min.jpg';
import room_4 from '../assets/room4.jpg';
import room_5 from '../assets/room5.jpg';
import room_6 from '../assets/room6.jpg';
import room_7 from '../assets/room7.jpg';

// Mapping des images
const imageMap = {
  room_1, room_2, room_3, room_4, room_5, room_6, room_7
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({});

  // Récupérer les critères de recherche
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const criteria = {
      checkIn: params.get('checkIn'),
      checkOut: params.get('checkOut'),
      roomType: params.get('roomType'),
      priceMin: params.get('priceMin') || '',
      priceMax: params.get('priceMax') || ''
    };
    
    setSearchCriteria(criteria);
  }, [location]);

  // Utilisation de React Query pour la recherche
  const { data: filteredRooms, isLoading, error } = useQuery({
    queryKey: ['search', searchCriteria],
    queryFn: () => roomService.searchRooms(searchCriteria),
    enabled: !!searchCriteria.checkIn, // Ne s'exécute que si checkIn est défini
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' GNF';
  };

  const handleRoomClick = (roomId) => {
    navigate(`/chambre/${roomId}`);
  };

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Recherche en cours...
            </h1>
          </div>
          
          {/* Squelette de chargement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Erreur de recherche</h3>
            <p className="text-gray-600 mb-4">Impossible de charger les résultats.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* En-tête avec critères */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Résultats de votre recherche
          </h1>
          
          {searchCriteria.checkIn && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
                <span>Du {searchCriteria.checkIn} au {searchCriteria.checkOut}</span>
              </div>
              
              {searchCriteria.roomType && (
                <div className="flex items-center gap-2">
                  <FaBed className="text-blue-500 flex-shrink-0" />
                  <span>Type: {searchCriteria.roomType}</span>
                </div>
              )}
              
              {(searchCriteria.priceMin || searchCriteria.priceMax) && (
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-blue-500 flex-shrink-0" />
                  <span>
                    Prix: {searchCriteria.priceMin ? formatPrice(parseInt(searchCriteria.priceMin)) : '0'} - {searchCriteria.priceMax ? formatPrice(parseInt(searchCriteria.priceMax)) : '∞'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Résultats count */}
        <div className="mb-4 md:mb-6">
          <p className="text-gray-600 text-sm md:text-base">
            {filteredRooms?.length || 0} chambre(s) trouvée(s)
          </p>
        </div>

        {/* Liste des chambres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredRooms?.map(room => (
            <div 
              key={room.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleRoomClick(room.id)}
            >
              <img 
                src={imageMap[room.image]} 
                alt={room.title}
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 pr-2">{room.title}</h3>
                  <span className="text-green-600 font-bold text-sm sm:text-base whitespace-nowrap">
                    {room.priceFormatted}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-gray-500 text-xs">+{room.amenities.length - 3}</span>
                  )}
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium">
                  Voir détails
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Aucun résultat */}
        {filteredRooms?.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <p className="text-gray-500 text-lg md:text-xl mb-4">
              Aucune chambre ne correspond à vos critères
            </p>
            <button 
              onClick={() => navigate('/chambres')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              Voir toutes les chambres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}