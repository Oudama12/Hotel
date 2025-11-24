// src/services/roomService.js

// Données mockées complètes
const mockRooms = [
  {
    id: 1,
    title: "Chambre Deluxe",
    price: 3000000,
    priceFormatted: "3.000.000 GNF",
    image: "room_6",
    type: "deluxe",
    description: "Chambre spacieuse avec vue sur la mer, lit king size et salle de bain privée.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Mini-bar", "Salle de bain privée"],
    disponibilité: true
  },
  {
    id: 2,
    title: "Suite Présidentielle",
    price: 5000000,
    priceFormatted: "5.000.000 GNF",
    image: "room_7",
    type: "présidentielle",
    description: "Suite luxueuse avec salon privé, jacuzzi et terrasse panoramique.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Jacuzzi", "Terrasse", "Service en chambre"],
    disponibilité: true
  },
  {
    id: 3,
    title: "Chambre Confort",
    price: 3000000,
    priceFormatted: "3.000.000 GNF",
    image: "room_4",
    type: "confort",
    description: "Chambre confortable avec tous les équipements essentiels pour un séjour agréable.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Terrasse", "Service en chambre"],
    disponibilité: true
  },
  {
    id: 4,
    title: "Chambre Standard",
    price: 2000000,
    priceFormatted: "2.000.000 GNF",
    image: "room_2",
    type: "standard",
    description: "Chambre confortable avec tous les équipements essentiels pour un séjour agréable.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Service en chambre"],
    disponibilité: true
  },
  {
    id: 5,
    title: "Suite Familiale",
    price: 4000000,
    priceFormatted: "4.000.000 GNF",
    image: "room_5",
    type: "familiale",
    description: "Parfaite pour les familles, espace généreux et confort optimal.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat", "Jacuzzi", "Terrasse", "Service en chambre"],
    disponibilité: true
  },
  {
    id: 6,
    title: "Chambre Économique",
    price: 1500000,
    priceFormatted: "1.500.000 GNF",
    image: "room_1",
    type: "économique",
    description: "Confortable et économique, idéale pour les courts séjours.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat"],
    disponibilité: true
  },
  {
    id: 7,
    title: "Chambre Normal",
    price: 1000000,
    priceFormatted: "1.000.000 GNF",
    image: "room_3",
    type: "normal",
    description: "Chambre simple et fonctionnelle pour vos besoins essentiels.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "TV écran plat"],
    disponibilité: true
  }
];

// Simuler un appel API avec délai
export const roomService = {
  // Récupérer toutes les chambres
  getRooms: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRooms;
  },

  // Récupérer une chambre par ID
  getRoomById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const room = mockRooms.find(room => room.id === parseInt(id));
    if (!room) {
      throw new Error('Chambre non trouvée');
    }
    return room;
  },

  // Récupérer les chambres featured (pour la page d'accueil)
  getFeaturedRooms: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockRooms.slice(0, 3);
  },

  // Rechercher des chambres avec filtres
  searchRooms: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let results = mockRooms.filter(room => room.disponibilité);

    // Appliquer les filtres
    if (filters.roomType) {
      results = results.filter(room => room.type === filters.roomType);
    }

    if (filters.priceMin) {
      results = results.filter(room => room.price >= parseInt(filters.priceMin));
    }

    if (filters.priceMax) {
      results = results.filter(room => room.price <= parseInt(filters.priceMax));
    }

    return results;
  }
};