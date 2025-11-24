// src/Pages/Inscription.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CookieService } from '../utils/cookies';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Inscription() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  const [pendingRegistration, setPendingRegistration] = useState(null);
  React.useEffect(() => {
    // If user visits the inscription page and hasn't given consent, show the prompt
    if (!CookieService.hasConsent()) {
      setShowConsentPrompt(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // If user hasn't given cookie consent yet, ask now and hold the registration
    if (!CookieService.hasConsent()) {
      setPendingRegistration({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      setShowConsentPrompt(true);
      return;
    }

    try {
      await register({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      navigate('/profil');
    } catch (err) {
      setError("Erreur lors de l'inscription");
    }
  };

  const proceedAfterConsent = async (consentType) => {
    // Save consent according to the choice
    if (consentType === 'all') {
      CookieService.acceptAll();
    } else {
      CookieService.acceptEssential();
    }

    setShowConsentPrompt(false);

    if (!pendingRegistration) return;

    try {
      await register(pendingRegistration);
      setPendingRegistration(null);
      navigate('/profil');
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20 mt-20">
      <div className="max-w-md mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Inscription
            </h1>
            <p className="text-gray-600">
              Rejoignez FAC HOTEL
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Jean Dupont"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+224 XXX XXX XXX"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Au moins 6 caractères"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Répétez votre mot de passe"
                  required
                />
              </div>
            </div>

            {/* Soumettre */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-4 rounded-lg font-semibold text-lg transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
              }`}
            >
              {loading ? 'Inscription...' : 'Créer mon compte'}
            </button>

            {/* Lien connexion */}
            <div className="text-center">
              <p className="text-gray-600">
                Déjà un compte ?{' '}
                <Link
                  to="/connexion"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Consent modal shown only when needed */}
      {showConsentPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-xl mx-4">
            <h3 className="text-xl font-semibold mb-3">Consentement aux cookies</h3>
            <p className="text-sm text-gray-700 mb-4">Avant de créer votre compte, acceptez-vous l'utilisation des cookies pour améliorer votre expérience ?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConsentPrompt(false)}
                className="px-4 py-2 rounded-md border"
              >
                Annuler
              </button>
              <button
                onClick={() => proceedAfterConsent('essential')}
                className="px-4 py-2 rounded-md bg-gray-100"
              >
                Accepter essentiels
              </button>
              <button
                onClick={() => proceedAfterConsent('all')}
                className="px-4 py-2 rounded-md bg-green-600 text-white"
              >
                Accepter et créer mon compte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}