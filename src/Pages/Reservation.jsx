import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReservationForm from "../Components/ReservationForm";

export default function Reservation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, addReservation } = useAuth();
  
  const [reservationData, setReservationData] = useState({
    chambreId: "",
    checkIn: "",
    checkOut: ""
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [reservationError, setReservationError] = useState(null);

  // Récupérer les paramètres d'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chambreId = params.get('chambre') || "";
    const checkIn = params.get('checkIn') || "";
    const checkOut = params.get('checkOut') || "";
    
    setReservationData({
      chambreId: chambreId,
      checkIn: checkIn,
      checkOut: checkOut
    });
  }, [location]);

  const handleReservationSubmit = (formData) => {
    // Clear any previous reservation error when starting a new submission
    setReservationError(null);

    const dataComplet = {
      ...reservationData,
      ...formData,
      reservationId: 'RES' + Date.now(),
      dateReservation: new Date().toISOString()
    };
    
    console.log("Réservation complète:", dataComplet);
    
    // 🔥 IMPORTANT : Lier la réservation au compte utilisateur
    if (user) {
      // Sauvegarder la réservation dans le système
      try {
        const savedReservation = addReservation(dataComplet);
        console.log("Réservation liée au compte:", savedReservation);
        // clear any previous error after success
        setReservationError(null);
      } catch (error) {
        console.error('Erreur réservation:', error);
        setReservationError(error.message || 'Erreur lors de la réservation');
        return; // ne pas continuer
      }
    } else {
      console.log("Utilisateur non connecté - réservation non sauvegardée");
      // Vous pourriez rediriger vers la connexion ici
      // navigate('/connexion?redirect=/reservation');
    }
    
    // Si paiement en ligne, rediriger directement vers la page de paiement
    if (formData.paymentMethod === "online") {
      // Redirection vers la page de paiement
      navigate(`/paiement?reservation=${dataComplet.reservationId}`);
    } else {
      // Pour paiement sur place, afficher le message de confirmation
      setConfirmedReservation(dataComplet);
      setShowSuccessMessage(true);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {reservationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-medium">{reservationError}</p>
            <div className="mt-3">
              <button
                onClick={() => setReservationError(null)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
        
        
        {/* Notification si non connecté */}
        {!user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <p className="text-yellow-800">
                <strong>Conseil :</strong>{" "}
                <a href="/connexion" className="underline">Connectez-vous</a>{" "}
                pour sauvegarder votre réservation dans votre compte.
              </p>
            </div>
          </div>
        )}
        
        {/* Message de confirmation (uniquement pour paiement sur place) */}
        {showSuccessMessage && confirmedReservation && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-800">Réservation confirmée !</h3>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <p className="text-green-700 mb-3">
                <strong>Merci pour votre réservation !</strong> Nous vous contacterons dans les 24h pour finaliser votre séjour.
              </p>
              
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Référence :</strong> {confirmedReservation.reservationId}</p>
                <p><strong>Chambre :</strong> {confirmedReservation.room.title}</p>
                <p><strong>Période :</strong> {confirmedReservation.dates.checkIn} au {confirmedReservation.dates.checkOut}</p>
                <p><strong>Nuits :</strong> {confirmedReservation.nights} nuit(s)</p>
                <p><strong>Voyageurs :</strong> {confirmedReservation.adults} adulte(s), {confirmedReservation.children} enfant(s)</p>
                <p><strong>Total :</strong> {confirmedReservation.totalPrice.toLocaleString()} GNF</p>
                <p><strong>Mode de paiement :</strong> 
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Paiement sur place
                  </span>
                </p>
                {user && (
                  <p><strong>Statut :</strong> 
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      Sauvegardée dans votre compte
                    </span>
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
              {user && (
                <a
                  href="/profil"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Voir mes réservations
                </a>
              )}
            </div>
          </div>
        )}

        {/* Récapitulatif */}
        {reservationData.chambreId && !showSuccessMessage && (
          <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
            <h3 className="text-xl font-semibold mb-2">Récapitulatif de votre réservation</h3>
            <p className="text-gray-700">
              <strong>Chambre #{reservationData.chambreId}</strong> - 
              Du <strong>{reservationData.checkIn}</strong> au <strong>{reservationData.checkOut}</strong>
            </p>
            {user && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Connecté en tant que {user.name} - Votre réservation sera sauvegardée
              </p>
            )}
          </div>
        )}

        {/* Afficher le formulaire seulement si pas de confirmation */}
        {!showSuccessMessage && (
          <ReservationForm 
            onSubmit={handleReservationSubmit}
          />
        )}
      </div>
    </div>
  );
}