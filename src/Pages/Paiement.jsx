// src/Pages/Paiement.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Paiement() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Paiement FAC HOTEL
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Page de paiement sécurisée
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Réservation #RES123456
            </h3>
            <div className="space-y-2 text-left">
              <p><strong>Chambre:</strong> Suite Deluxe</p>
              <p><strong>Durée:</strong> 3 nuits</p>
              <p><strong>Total:</strong> 3.000.000 GNF</p>
            </div>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <button
              onClick={() => alert("Paiement Wave simulé !")}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Payer avec Wave
            </button>
            
            <button
              onClick={() => alert("Paiement Orange Money simulé !")}
              className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
            >
              Payer avec Orange Money
            </button>
            
            <button
              onClick={() => navigate("/reservation")}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Retour à la réservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}