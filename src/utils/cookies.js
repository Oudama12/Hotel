// src/utils/cookies.js
export const CookieService = {
  // Définir un cookie
  set(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    const domain = window.location.hostname;
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax;domain=${domain}`;
  },

  // Récupérer un cookie
  get(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  },

  // Supprimer un cookie
  delete(name) {
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
  },

  // Accepter tous les cookies
  acceptAll() {
    this.set('cookie_consent', 'all', 365);
    this.set('cookie_analytics', 'true', 365);
    this.set('cookie_marketing', 'true', 365);
  },

  // Refuser les cookies optionnels
  acceptEssential() {
    this.set('cookie_consent', 'essential', 365);
    this.set('cookie_analytics', 'false', 365);
    this.set('cookie_marketing', 'false', 365);
  },

  // Vérifier si les cookies sont acceptés
  hasConsent() {
    return this.get('cookie_consent') !== null;
  },

  // Obtenir les préférences
  getPreferences() {
    return {
      consent: this.get('cookie_consent'),
      analytics: this.get('cookie_analytics') === 'true',
      marketing: this.get('cookie_marketing') === 'true'
    };
  }
};