// src/Pages/PolitiqueCookies.jsx
import React from 'react';
import { FaShieldAlt, FaChartBar, FaBullhorn, FaTrash } from 'react-icons/fa';
import { CookieService } from '../utils/cookies';

export default function PolitiqueCookies() {
  const handleRevokeConsent = () => {
    CookieService.delete('cookie_consent');
    CookieService.delete('cookie_analytics');
    CookieService.delete('cookie_marketing');
    alert('Vos préférences cookies ont été réinitialisées. La page va se recharger.');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Politique de Cookies</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Cette politique explique comment FAC HOTEL utilise les cookies et technologies similaires 
              pour reconnaître les visiteurs de notre site web.
            </p>

            <div className="space-y-8">
              {/* Qu'est-ce qu'un cookie */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🍪 Qu'est-ce qu'un cookie ?</h2>
                <p className="text-gray-600">
                  Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. 
                  Il permet au site de mémoriser vos actions et préférences pendant une certaine période.
                </p>
              </section>

              {/* Types de cookies utilisés */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types de cookies utilisés</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <FaShieldAlt className="text-green-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Cookies Essentiels</h3>
                      <p className="text-gray-600 text-sm">
                        Nécessaires au fonctionnement du site. Ils gèrent votre session de connexion, 
                        votre panier de réservation et vos préférences de base. Ces cookies ne peuvent pas être désactivés.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <FaChartBar className="text-blue-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Cookies Analytics</h3>
                      <p className="text-gray-600 text-sm">
                        Nous aident à comprendre comment les visiteurs interagissent avec notre site. 
                        Ces données sont anonymisées et nous permettent d'améliorer nos services.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                    <FaBullhorn className="text-purple-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Cookies Marketing</h3>
                      <p className="text-gray-600 text-sm">
                        Utilisés pour vous montrer des publicités pertinentes sur d'autres sites web. 
                        Ces cookies suivent votre navigation pour personnaliser les contenus publicitaires.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gestion des cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestion de vos préférences</h2>
                <p className="text-gray-600 mb-4">
                  Vous pouvez modifier vos préférences à tout moment en cliquant sur le bouton ci-dessous :
                </p>
                
                <button
                  onClick={handleRevokeConsent}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FaTrash />
                  Réinitialiser mes préférences cookies
                </button>
                
                <p className="text-sm text-gray-500 mt-2">
                  Cette action supprimera tous vos choix et vous redemandera votre consentement.
                </p>
              </section>

              {/* Durée de conservation */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Durée de conservation</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-600">
                    <li>• Cookies de session : Supprimés à la fermeture du navigateur</li>
                    <li>• Cookies persistants : Conservés entre 30 jours et 2 ans</li>
                    <li>• Préférences de consentement : 1 an</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}