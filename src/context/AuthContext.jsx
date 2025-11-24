// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { CookieService } from '../utils/cookies'; // ← Import ajouté

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // Stocke tous les utilisateurs
  const [reservations, setReservations] = useState([]); // Réservations pour l'utilisateur connecté

  // Au chargement, récupérer les données sauvegardées
  React.useEffect(() => {
    const savedUsers = localStorage.getItem('hotel_users');
    const savedUser = localStorage.getItem('current_user');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // Charger uniquement les réservations de l'utilisateur connecté
      try {
        const key = `hotel_reservations_${parsedUser.id}`;
        const saved = localStorage.getItem(key);
        const userReservations = saved ? JSON.parse(saved) : [];
        setReservations(userReservations);
      } catch {
        setReservations([]);
      }

      // Si l'utilisateur est connecté et que les cookies analytics sont acceptés,
      // sauvegarder les préférences de langue
      const prefs = CookieService.getPreferences();
      if (prefs.analytics) {
        CookieService.set('user_language', 'fr', 30);
        CookieService.set('user_last_login', new Date().toISOString(), 30);
      }
    }
  }, []);

  // Inscription - CRÉER un nouvel utilisateur
  const register = async (userData) => {
    setLoading(true);
    
    // Vérifier si l'email existe déjà
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      setLoading(false);
      throw new Error('Un compte avec cet email existe déjà');
    }

    // Créer le nouvel utilisateur
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    
    // Sauvegarder
    localStorage.setItem('hotel_users', JSON.stringify(updatedUsers));
    localStorage.setItem('current_user', JSON.stringify(newUser));
    
    // Sauvegarder dans les cookies si consentement donné
    const prefs = CookieService.getPreferences();
    if (prefs.analytics) {
      CookieService.set('user_preferences', JSON.stringify({
        language: 'fr',
        currency: 'GNF',
        lastActivity: new Date().toISOString()
      }), 30);
      
      CookieService.set('user_registration_date', newUser.createdAt, 365);
    }
    
    setLoading(false);
    return newUser;
  };

  // Connexion - TROUVER l'utilisateur existant
  const login = async (email) => {
    setLoading(true);
    
    // Trouver l'utilisateur par email
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      setLoading(false);
      throw new Error('Aucun compte trouvé avec cet email');
    }

    // En attendant un vrai système de mot de passe
    // Pour l'instant on accepte n'importe quel mot de passe
    setUser(foundUser);
    localStorage.setItem('current_user', JSON.stringify(foundUser));
    // Après login, charger uniquement les réservations de cet utilisateur
    try {
      const key = `hotel_reservations_${foundUser.id}`;
      const saved = localStorage.getItem(key);
      const userReservations = saved ? JSON.parse(saved) : [];
      setReservations(userReservations);
    } catch {
      setReservations([]);
    }
    
    // Sauvegarder dans les cookies si consentement donné
    const prefs = CookieService.getPreferences();
    if (prefs.analytics) {
      // Sauvegarder la dernière connexion pour cet utilisateur
      CookieService.set(`user_last_login_${foundUser.id}`, new Date().toISOString(), 30);

      // Compteur de connexions stocké par utilisateur (évite partage entre comptes)
      const loginKey = `user_login_count_${foundUser.id}`;
      const currentLoginCount = parseInt(CookieService.get(loginKey) || '0');
      CookieService.set(loginKey, currentLoginCount + 1, 365);
      
      // Préférences utilisateur
      CookieService.set('user_preferences', JSON.stringify({
        language: 'fr',
        currency: 'GNF',
        lastActivity: new Date().toISOString(),
        preferredRoomType: null // Peut être rempli plus tard
      }), 30);
    }
    
    setLoading(false);
    return foundUser;
  };

  // Déconnexion
  const logout = () => {
    // Sauvegarder la dernière activité avant déconnexion
    const prefs = CookieService.getPreferences();
    if (prefs.analytics && user) {
      CookieService.set('user_last_activity', new Date().toISOString(), 7);
    }
    
    setUser(null);
    localStorage.removeItem('current_user');
    // Ne pas conserver les réservations en mémoire après logout
    setReservations([]);
    // Supprimer ou nettoyer certains cookies utilisateurs optionnels
    CookieService.delete('user_preferences');
    CookieService.delete('user_last_room_type');
    // NOTE: ne pas supprimer 'user_reservation_count' ici : le compteur est calculé
    // dynamiquement depuis localStorage par utilisateur afin de préserver les
    // statistiques après un logout/login.
    CookieService.delete('user_travel_preferences');
  };

  // Ajouter une réservation
  const addReservation = (reservationData) => {
    // Helper: récupérer toutes les réservations de tous les utilisateurs (depuis localStorage)
    const getAllReservations = () => {
      const all = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('hotel_reservations_')) {
          try {
            const arr = JSON.parse(localStorage.getItem(key) || '[]');
            if (Array.isArray(arr)) all.push(...arr);
          } catch {
            // ignore parse errors
          }
        }
      }
      return all;
    };

    // Helper: vérifier chevauchement de dates
    const datesOverlap = (aStart, aEnd, bStart, bEnd) => {
      const aS = new Date(aStart).getTime();
      const aE = new Date(aEnd).getTime();
      const bS = new Date(bStart).getTime();
      const bE = new Date(bEnd).getTime();
      // Consider overlapping when ranges intersect
      return !(aE <= bS || bE <= aS);
    };
    const newReservation = {
      id: 'RES' + Date.now(),
      userId: user.id,
      ...reservationData,
      createdAt: new Date().toISOString(),
      status: 'confirmée'
    };

    if (!user) throw new Error('Utilisateur non authentifié');

    // Valider la présence des dates
    const checkIn = reservationData.dates?.checkIn;
    const checkOut = reservationData.dates?.checkOut;
    if (!checkIn || !checkOut) throw new Error('Dates invalides pour la réservation');

    // Vérifier la disponibilité globale de la chambre (toutes les réservations)
    const all = getAllReservations();
    const roomId = reservationData.room?.id || reservationData.chambreId || null;
    if (roomId) {
      const conflict = all.find(r => {
        const rRoomId = r.room?.id || r.chambreId || null;
        if (rRoomId !== roomId) return false;
        // si les dates se chevauchent => conflit
        return datesOverlap(checkIn, checkOut, r.dates?.checkIn, r.dates?.checkOut);
      });
      if (conflict) {
        throw new Error('La chambre n\'est pas disponible pour ces dates');
      }
    }

    // Enregistrer les réservations pour cet utilisateur uniquement
    const key = `hotel_reservations_${user.id}`;
    const saved = localStorage.getItem(key);
    const userReservations = saved ? JSON.parse(saved) : [];
    const updated = [...userReservations, newReservation];
    localStorage.setItem(key, JSON.stringify(updated));
    setReservations(updated);
    
    // Sauvegarder les préférences de réservation dans les cookies
    const prefs = CookieService.getPreferences();
    if (prefs.analytics) {
      // Sauvegarder le type de chambre préféré
      const roomType = reservationData.room?.title || 'unknown';
      CookieService.set('user_last_room_type', roomType, 90);
      
      // Incrémenter le compteur de réservations
      // Stocker le compteur de réservations par utilisateur (clé utilisateur)
      const reservationKey = `user_reservation_count_${user.id}`;
      const reservationCount = parseInt(CookieService.get(reservationKey) || '0') + 1;
      CookieService.set(reservationKey, reservationCount.toString(), 365);
      
      // Sauvegarder les préférences de voyage
      const travelPreferences = {
        adults: reservationData.adults || 1,
        children: reservationData.children || 0,
        lastSearch: {
          checkIn: reservationData.dates?.checkIn,
          checkOut: reservationData.dates?.checkOut
        }
      };
      CookieService.set('user_travel_preferences', JSON.stringify(travelPreferences), 60);
    }
    
    return newReservation;
  };

  // Obtenir les réservations de l'utilisateur connecté
  const getUserReservations = () => {
    if (!user) return [];
    return reservations.filter(reservation => reservation.userId === user.id);
  };

  // Obtenir les préférences utilisateur depuis les cookies
  const getUserPreferences = () => {
    if (!user) return null;
    
    const prefs = CookieService.getPreferences();
    if (!prefs.analytics) return null;
    
    try {
      const userPrefs = CookieService.get('user_preferences');
      const travelPrefs = CookieService.get('user_travel_preferences');
      // Calculer dynamiquement le nombre de réservations depuis localStorage
      const key = `hotel_reservations_${user.id}`;
      const saved = localStorage.getItem(key);
      const reservationCountFromStorage = saved ? (JSON.parse(saved).length || 0) : 0;

      return {
        general: userPrefs ? JSON.parse(userPrefs) : null,
        travel: travelPrefs ? JSON.parse(travelPrefs) : null,
        stats: {
          // Lire le compteur de connexions pour l'utilisateur courant
          loginCount: parseInt(CookieService.get(`user_login_count_${user.id}`) || '0'),
          // Preferer le comptage localStorage (par utilisateur) plutôt que la valeur du cookie
          reservationCount: reservationCountFromStorage,
          lastRoomType: CookieService.get('user_last_room_type'),
          lastActivity: CookieService.get('user_last_activity')
        }
      };
    } catch (error) {
      console.error('Erreur lecture préférences:', error);
      return null;
    }
  };

  // Mettre à jour les préférences utilisateur
  const updateUserPreferences = (preferences) => {
    const prefs = CookieService.getPreferences();
    if (prefs.analytics && user) {
      CookieService.set('user_preferences', JSON.stringify(preferences), 30);
    }
  };

  const value = {
    user,
    users,
    login,
    register,
    logout,
    loading,
    addReservation,
    getUserReservations,
    getUserPreferences, // ← Nouvelle fonction
    updateUserPreferences // ← Nouvelle fonction
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}