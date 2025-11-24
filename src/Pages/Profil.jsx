// src/Pages/Profil.jsx - Version avec cookies
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaSignOutAlt, 
  FaHistory, 
  FaCalendar, 
  FaBed,
  FaChartLine,
  FaHeart,
  FaClock,
  FaCog
} from 'react-icons/fa';

export default function Profil() {
  const { user, logout, getUserReservations, getUserPreferences } = useAuth();
  const userReservations = getUserReservations();
  const userPreferences = getUserPreferences();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' GNF';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non disponible';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Non connecté</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">Membre FAC HOTEL</p>
                <p className="text-sm text-gray-500">
                  Membre depuis le {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
            
            {/* Statistiques rapides */}
            {userPreferences && (
              <div className="flex gap-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {userPreferences.stats.loginCount}
                  </div>
                  <div className="text-xs text-gray-600">Connexions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {userPreferences.stats.reservationCount}
                  </div>
                  <div className="text-xs text-gray-600">Réservations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {userReservations.length}
                  </div>
                  <div className="text-xs text-gray-600">Séjours</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Colonne principale */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations personnelles */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  Informations personnelles
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <FaUser className="text-gray-400 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600">Nom complet</p>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <FaEnvelope className="text-gray-400 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <FaPhone className="text-gray-400 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600">Téléphone</p>
                      <p className="font-semibold text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistiques détaillées */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaChartLine className="text-green-600" />
                  Vos statistiques
                </h2>

                {userPreferences ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {userPreferences.stats.loginCount}
                        </div>
                        <div className="text-xs text-blue-800">Connexions</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {userPreferences.stats.reservationCount}
                        </div>
                        <div className="text-xs text-green-800">Réservations</div>
                      </div>
                    </div>

                    {userPreferences.stats.lastRoomType && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaHeart className="text-purple-600" />
                          <span className="font-semibold text-purple-800">Chambre préférée</span>
                        </div>
                        <p className="text-sm text-purple-700">{userPreferences.stats.lastRoomType}</p>
                      </div>
                    )}

                    {userPreferences.stats.lastActivity && (
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaClock className="text-yellow-600" />
                          <span className="font-semibold text-yellow-800">Dernière activité</span>
                        </div>
                        <p className="text-sm text-yellow-700">{formatDate(userPreferences.stats.lastActivity)}</p>
                      </div>
                    )}

                    {userPreferences.travel && (
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCog className="text-indigo-600" />
                          <span className="font-semibold text-indigo-800">Préférences de voyage</span>
                        </div>
                        <div className="text-sm text-indigo-700 space-y-1">
                          <div>{userPreferences.travel.adults} adulte(s)</div>
                          <div>{userPreferences.travel.children} enfant(s)</div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaChartLine className="text-gray-300 text-4xl mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Aucune statistique disponible</p>
                    <p className="text-xs text-gray-500">
                      Acceptez les cookies analytics pour voir vos statistiques
                    </p>
                  </div>
                )}
              </div>

              {/* Réservations */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaHistory className="text-blue-600" />
                    Mes réservations
                  </h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {userReservations.length}
                  </span>
                </div>

                {userReservations.length > 0 ? (
                  <div className="space-y-4">
                    {userReservations.map((reservation) => (
                      <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <FaBed className="text-blue-600" />
                            <h3 className="font-semibold text-gray-800">{reservation.room?.title || 'Chambre'}</h3>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            reservation.status === 'confirmée' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reservation.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-gray-400" />
                            <span>{reservation.dates?.checkIn} au {reservation.dates?.checkOut}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{reservation.nights} nuit(s)</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-green-600">
                            {formatPrice(reservation.totalPrice || 0)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(reservation.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaHistory className="text-gray-300 text-4xl mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucune réservation pour le moment</p>
                    <a 
                      href="/chambres"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                      Voir les chambres
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Actions rapides */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Actions</h3>
              
              <div className="space-y-3">
                <a 
                  href="/chambres"
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <FaBed className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Réserver</span>
                </a>

                <a 
                  href="/politique-cookies"
                  className="w-full flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <FaCog className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Gérer les cookies</span>
                </a>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors group"
                >
                  <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Déconnexion</span>
                </button>
              </div>

              {/* Résumé activité */}
              <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaChartLine className="text-blue-600" />
                  Récapitulatif
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Séjours effectués:</span>
                    <span className="font-semibold">{userReservations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membre depuis:</span>
                    <span className="font-semibold">{formatDate(user.createdAt)}</span>
                  </div>
                  {userPreferences && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total connexions:</span>
                        <span className="font-semibold">{userPreferences.stats.loginCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dernière activité:</span>
                        <span className="font-semibold">{formatDate(userPreferences.stats.lastActivity)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}