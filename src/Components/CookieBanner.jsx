// src/Components/CookieBanner.jsx
import React, { useState, useEffect } from 'react';
import { CookieService } from '../utils/cookies';
import { FaCookieBite, FaTimes, FaShieldAlt, FaChartBar, FaBullhorn } from 'react-icons/fa';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    if (!CookieService.hasConsent()) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    CookieService.acceptAll();
    setIsVisible(false);
    // Ici vous pouvez initialiser Google Analytics, Facebook Pixel, etc.
    initializeTracking();
  };

  const acceptEssential = () => {
    CookieService.acceptEssential();
    setIsVisible(false);
  };

  const savePreferences = () => {
    CookieService.set('cookie_consent', 'custom', 365);
    CookieService.set('cookie_analytics', preferences.analytics.toString(), 365);
    CookieService.set('cookie_marketing', preferences.marketing.toString(), 365);
    setIsVisible(false);
    
    if (preferences.analytics) {
      initializeAnalytics();
    }
    if (preferences.marketing) {
      initializeMarketing();
    }
  };

  const initializeTracking = () => {
    // Initialiser Google Analytics
    if (typeof window !== 'undefined') {
      console.log('Initialisation des cookies de tracking...');
      // Exemple: window.gtag('config', 'GA_MEASUREMENT_ID');
    }
  };

  const initializeAnalytics = () => {
    console.log('Initialisation Analytics...');
  };

  const initializeMarketing = () => {
    console.log('Initialisation Marketing...');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Contenu principal */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <FaCookieBite className="text-blue-600 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Respect de votre vie privée
              </h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
              Certains cookies sont essentiels au fonctionnement du site.
            </p>

            {showDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Cookies Essentiels</h4>
                      <p className="text-gray-600 text-sm">
                        Nécessaires au fonctionnement du site. Gèrent votre session, votre panier et vos préférences.
                      </p>
                      <span className="text-xs text-green-600">Toujours activés</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaChartBar className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Cookies Analytics</h4>
                      <p className="text-gray-600 text-sm">
                        Nous aident à comprendre comment vous utilisez notre site pour améliorer nos services.
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences(prev => ({...prev, analytics: e.target.checked}))}
                          className="rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Accepter les cookies analytics</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaBullhorn className="text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Cookies Marketing</h4>
                      <p className="text-gray-600 text-sm">
                        Utilisés pour vous montrer des publicités pertinentes sur d'autres sites.
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences(prev => ({...prev, marketing: e.target.checked}))}
                          className="rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Accepter les cookies marketing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {showDetails ? 'Masquer les détails' : 'Personnaliser mes préférences'}
              </button>
              <a 
                href="/politique-cookies" 
                className="text-gray-500 hover:text-gray-700"
              >
                Politique des cookies
              </a>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {showDetails ? (
              <>
                <button
                  onClick={savePreferences}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  Enregistrer mes préférences
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                >
                  Tout accepter
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={acceptEssential}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                >
                  Cookies essentiels uniquement
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  Tout accepter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}