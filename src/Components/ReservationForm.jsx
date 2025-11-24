import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajout de l'import

// Importe tes images
import room_1 from '../assets/room1.jpg';
import room_2 from '../assets/room2.jpg';
import room_3 from '../assets/room3-min.jpg';
import room_4 from "../assets/room4.jpg";
import room_5 from '../assets/room5.jpg';
import room_6 from "../assets/room6.jpg";
import room_7 from "../assets/room7.jpg";

const ReservationForm = ({ onSubmit }) => {
  const location = useLocation();
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: ""
  });
  const [errors, setErrors] = useState({});
  
  // Pré-remplir avec les infos de l'utilisateur connecté
  const [formData, setFormData] = useState({
    adults: 1,
    children: 0,
    name: user?.name || "", // Pré-remplir le nom
    email: user?.email || "", // Pré-remplir l'email
    phone: user?.phone || "", // Pré-remplir le téléphone
    specialRequests: ""
  });

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const today = new Date().toISOString().split('T')[0];

  const availableRooms = [
    {
      id: 1,
      title: "Chambre Deluxe",
      price: 3000000,
      description: "Chambre spacieuse avec vue sur la mer, lit king size et salle de bain privée.",
      image: room_6,
      amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Mini-bar", "Salle de bain privée"]
    },
    {
      id: 2,
      title: "Suite Présidentielle", 
      price: 5000000,
      description: "Suite luxueuse avec salon privé, jacuzzi et terrasse panoramique.",
      image: room_7,
      amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Jacuzzi", "Terrasse", "Service en chambre"]
    },
    {
      id: 3,
      title: "Chambre Confort", 
      price: 3000000,
      description: "Chambre confortable avec tous les équipements essentiels pour un séjour agréable.",
      image: room_4,
      amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Terrasse", "Service en chambre"]
    },
    {
      id: 4,
      title: "Chambre Standard", 
      price: 2000000,
      description: "Chambre confortable avec tous les équipements essentiels pour un séjour agréable.",
      image: room_2,
      amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Service en chambre"]
    },
    {
      id: 5,
      title: "Suite Familiale", 
      price: 4000000,
      description: "Parfaite pour les familles, espace généreux et confort optimal.",
      image: room_5,
      amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Jacuzzi", "Terrasse", "Service en chambre"]
    },
    {
      id: 6,
      title: "Chambre Économique", 
      price: 1500000,
      description: "Confortable et économique, idéale pour les courts séjours.",
      image: room_1,
      amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat"]
    }, 
    {
      id: 7,
      title: "Chambre Normal", 
      price: 1000000,
      description: "Chambre simple et fonctionnelle pour vos besoins essentiels.",
      image: room_3,
      amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat"]
    }
  ];

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chambreId = params.get('chambre');
    const checkIn = params.get('checkIn');
    const checkOut = params.get('checkOut');
    
    if (chambreId) {
      const room = availableRooms.find(r => r.id === parseInt(chambreId));
      if (room) setSelectedRoom(room);
    }
    
    if (checkIn || checkOut) {
      setSelectedDates({
        checkIn: checkIn || "",
        checkOut: checkOut || ""
      });
    }
  }, [location]);

  // Mettre à jour le formulaire si l'utilisateur se connecte pendant
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone
      }));
    }
  }, [user]);

  const validateDates = () => {
    const newErrors = {};
    
    if (!selectedDates.checkIn) newErrors.checkIn = "Date d'arrivée obligatoire";
    else if (selectedDates.checkIn < today) newErrors.checkIn = "Date dans le passé";

    if (!selectedDates.checkOut) newErrors.checkOut = "Date de départ obligatoire";
    else if (selectedDates.checkOut < today) newErrors.checkOut = "Date dans le passé";

    if (selectedDates.checkIn && selectedDates.checkOut && selectedDates.checkOut <= selectedDates.checkIn) {
      newErrors.checkOut = "Départ après arrivée";
    }

    return newErrors;
  };

  const handleDateChange = (field, value) => {
    setSelectedDates(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const calculateTotalPrice = () => {
    if (!selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = new Date(selectedDates.checkIn);
    const checkOut = new Date(selectedDates.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return selectedRoom.price * nights;
  };

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = new Date(selectedDates.checkIn);
    const checkOut = new Date(selectedDates.checkOut);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' GNF';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateErrors = validateDates();
    if (Object.keys(dateErrors).length > 0) {
      setErrors(dateErrors);
      return;
    }
    if (!selectedRoom) {
      alert("Veuillez sélectionner une chambre");
      return;
    }

    // Afficher les options de paiement au lieu de soumettre directement
    setShowPaymentOptions(true);
  };

  const handlePaymentSelection = (paymentMethod) => {
    const reservationData = {
      ...formData,
      room: selectedRoom,
      dates: selectedDates,
      nights: calculateNights(),
      totalPrice: calculateTotalPrice(),
      paymentMethod: paymentMethod,
      status: paymentMethod === "online" ? "en_attente_paiement" : "confirmée"
    };
    
    onSubmit(reservationData);
    setShowPaymentOptions(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
        Finaliser votre réservation
      </h2>

      {/* Notification si connecté */}
      {user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-blue-800 text-sm">
              <strong>Connecté en tant que {user.name}</strong> - Vos informations sont pré-remplies
            </p>
          </div>
        </div>
      )}

      {/* Sélection de la période */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Période de séjour</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">
              Date d'arrivée *
            </label>
            <input
              type="date"
              value={selectedDates.checkIn}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
              min={today}
              className={`w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base ${
                errors.checkIn ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.checkIn && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.checkIn}</p>}
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">
              Date de départ *
            </label>
            <input
              type="date"
              value={selectedDates.checkOut}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
              min={selectedDates.checkIn || today}
              className={`w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base ${
                errors.checkOut ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.checkOut && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.checkOut}</p>}
          </div>
        </div>

        {selectedDates.checkIn && selectedDates.checkOut && calculateNights() > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium text-sm sm:text-base">
              Durée du séjour : <strong>{calculateNights()} nuit(s)</strong>
            </p>
          </div>
        )}
      </div>

      {/* Sélection de chambre */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Choisissez votre chambre</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-h-80 sm:max-h-96 overflow-y-auto p-2">
          {availableRooms.map(room => (
            <div
              key={room.id}
              className={`border-2 rounded-lg p-2 sm:p-3 cursor-pointer transition-all ${
                selectedRoom?.id === room.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              <img 
                src={room.image} 
                alt={room.title}
                className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-md mb-2"
              />
              <h4 className="font-semibold text-xs sm:text-sm md:text-base">{room.title}</h4>
              <p className="text-green-600 font-bold text-xs sm:text-sm">{formatPrice(room.price)} / nuit</p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{room.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Récapitulatif */}
      {(selectedRoom || selectedDates.checkIn) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3 sm:mb-4 text-lg">Récapitulatif</h3>
          
          {selectedRoom && (
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img 
                src={selectedRoom.image} 
                alt={selectedRoom.title}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-bold text-base sm:text-lg">{selectedRoom.title}</h4>
                <p className="text-green-600 font-semibold text-sm sm:text-base">{formatPrice(selectedRoom.price)} / nuit</p>
              </div>
            </div>
          )}

          {selectedDates.checkIn && selectedDates.checkOut && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div><span className="font-medium">Arrivée : </span><span className="font-semibold">{selectedDates.checkIn}</span></div>
              <div><span className="font-medium">Départ : </span><span className="font-semibold">{selectedDates.checkOut}</span></div>
              <div><span className="font-medium">Nuits : </span><span className="font-semibold">{calculateNights()}</span></div>
              {selectedRoom && (
                <div>
                  <span className="font-medium">Total : </span>
                  <span className="font-semibold text-green-600 text-base sm:text-lg">
                    {formatPrice(calculateTotalPrice())}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Formulaire informations personnelles */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
          Informations personnelles
          {user && (
            <span className="text-sm text-green-600 ml-2 font-normal">
              (Pré-remplies depuis votre compte)
            </span>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">
              Nom complet {!user && "*"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base ${
                user ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              required={!user}
              placeholder="Votre nom complet"
              readOnly={!!user}
            />
            {user && (
              <p className="text-xs text-green-600 mt-1">
                Informations de votre compte
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">
              Email {!user && "*"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base ${
                user ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              required={!user}
              placeholder="votre@email.com"
              readOnly={!!user}
            />
            {user && (
              <p className="text-xs text-green-600 mt-1">
                Email de connexion
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">
              Téléphone {!user && "*"}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base ${
                user ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              required={!user}
              placeholder="+224 XXX XXX XXX"
              readOnly={!!user}
            />
            {user && (
              <p className="text-xs text-green-600 mt-1">
                Téléphone de votre compte
              </p>
            )}
          </div>
          <div>
            {/* Espace pour alignement */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">Adultes</label>
            <select
              name="adults"
              value={formData.adults}
              onChange={handleFormChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
            >
              {[1, 2, 3, 4].map(num => <option key={num} value={num}>{num} Adulte(s)</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">Enfants</label>
            <select
              name="children"
              value={formData.children}
              onChange={handleFormChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
            >
              {[0, 1, 2, 3].map(num => <option key={num} value={num}>{num} Enfant(s)</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">Demandes spéciales</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleFormChange}
            rows="3"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
            placeholder="Préférences alimentaires, anniversaire, etc."
          />
        </div>

        <button
          type="submit"
          disabled={!selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut}
          className={`w-full py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors ${
            selectedRoom && selectedDates.checkIn && selectedDates.checkOut
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          {selectedRoom && selectedDates.checkIn && selectedDates.checkOut 
            ? `Choisir le mode de paiement - ${formatPrice(calculateTotalPrice())}` 
            : 'Complétez les informations'}
        </button>

        <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
          {user ? (
            "Vos informations personnelles sont sécurisées dans votre compte"
          ) : (
            "* Champs obligatoires. Nous vous contacterons dans les 24h."
          )}
        </p>
      </form>

      {/* Modal des options de paiement */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Choisissez votre mode de paiement</h3>
            
            {/* Option Paiement en ligne */}
            <div 
              className={`border-2 rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                selectedPaymentMethod === "online" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => setSelectedPaymentMethod("online")}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">💳 Paiement en ligne</h4>
                {selectedPaymentMethod === "online" && (
                  <span className="text-green-500">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-600 text-left">
                Payez maintenant de manière sécurisée. Supporte Wave, Orange Money et cartes bancaires.
              </p>
            </div>

            {/* Option Paiement sur place */}
            <div 
              className={`border-2 rounded-lg p-4 mb-6 cursor-pointer transition-all ${
                selectedPaymentMethod === "onsite" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedPaymentMethod("onsite")}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">🏨 Paiement à l'arrivée</h4>
                {selectedPaymentMethod === "onsite" && (
                  <span className="text-blue-500">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-600 text-left">
                Réservez maintenant sans paiement. Vous réglerez à votre arrivée à l'hôtel.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentOptions(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => selectedPaymentMethod && handlePaymentSelection(selectedPaymentMethod)}
                disabled={!selectedPaymentMethod}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedPaymentMethod 
                    ? selectedPaymentMethod === "online" 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;