import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { roomService } from "../services/roomService";

// Import des images
import room_6 from "../assets/room6.jpg";
import room_7 from "../assets/room7.jpg";
import room_4 from "../assets/room4.jpg";
import room_2 from "../assets/room2.jpg";
import room_5 from "../assets/room5.jpg";
import room_1 from "../assets/room1.jpg";
import room_3 from "../assets/room3-min.jpg";

// Mapping des images
const imageMap = {
  room_1, room_2, room_3, room_4, room_5, room_6, room_7
};

export default function Rooms() {
    const navigate = useNavigate();
    const [activeRoom, setActiveRoom] = useState(null);

    // Utilisation de React Query pour récupérer les chambres populaires
    const { data: chambres, isLoading, error } = useQuery({
        queryKey: ['featured-rooms'],
        queryFn: roomService.getFeaturedRooms,
    });

    const handleRoomClick = (chambreId) => {
        navigate(`/chambre/${chambreId}`);
    };

    const handleRoomTap = (chambreId, event) => {
        if (window.innerWidth < 768) {
            event.preventDefault();
            event.stopPropagation();
            setActiveRoom(activeRoom === chambreId ? null : chambreId);
        }
    };

    // États de chargement
    if (isLoading) {
        return (
            <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6">
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                        Nos Chambres Populaires
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                        Chargement des chambres...
                    </p>
                </div>
                
                {/* Squelette de chargement pour mobile */}
                <div className="md:hidden space-y-4 max-w-2xl mx-auto">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Squelette de chargement pour desktop */}
                <div className="hidden md:flex items-center justify-center gap-6 h-[400px] w-full max-w-6xl mx-auto">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="w-56 h-[400px] bg-gray-200 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    // État d'erreur
    if (error) {
        return (
            <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6">
                <div className="text-center">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
                    <p className="text-gray-600 mb-4">Impossible de charger les chambres populaires.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            {/* En-tête */}
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                    Nos Chambres Populaires
                </h1>
                <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                    Découvrez nos chambres les plus appréciées - chaque espace conçu pour votre confort et bien-être.
                </p>
            </div>

            {/* Version Mobile - Avec système de tap */}
            <div className="md:hidden space-y-4 max-w-2xl mx-auto">
                {chambres.map((chambre) => (
                    <div 
                        key={chambre.id}
                        className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                        onClick={(e) => handleRoomTap(chambre.id, e)}
                    >
                        <img
                            className="w-full h-48 object-cover"
                            src={imageMap[chambre.image]}
                            alt={chambre.title}
                            loading="lazy"
                            decoding="async"
                            width="384"
                            height="192"
                        />
                        
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold text-gray-800">{chambre.title}</h2>
                                <p className="text-green-600 font-semibold text-lg">{chambre.priceFormatted}</p>
                            </div>
                            
                            <div className={`transition-all duration-300 overflow-hidden ${
                                activeRoom === chambre.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <p className="text-gray-600 text-sm mb-3">{chambre.description}</p>
                            </div>
                            
                            <button 
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                                onClick={() => handleRoomClick(chambre.id)}
                            >
                                {activeRoom === chambre.id ? 'Réserver maintenant' : 'Voir détails'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Version Desktop - Centrée avec justify-center */}
            <div className="hidden md:flex items-center justify-center gap-6 h-[400px] w-full max-w-6xl mx-auto">
                {chambres.map((chambre) => (
                    <div 
                        key={chambre.id}
                        className="relative group w-56 h-[400px] transition-all duration-500 hover:w-full cursor-pointer"
                        onClick={() => handleRoomClick(chambre.id)}
                    >
                        <img
                            className="h-full w-full object-cover rounded-xl group-hover:rounded-l-xl group-first:hover:rounded-l-xl group-last:hover:rounded-r-xl transition-all duration-500"
                            src={imageMap[chambre.image]}
                            alt={chambre.title}
                            loading="lazy"
                            decoding="async"
                            width="320"
                            height="560"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl">
                            <h1 className="text-2xl font-bold mb-2">{chambre.title}</h1>
                            <p className="text-sm mb-3">{chambre.description}</p>
                            <p className="text-lg font-semibold text-yellow-400 mb-3">{chambre.priceFormatted} / nuit</p>
                            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors w-fit">
                                Voir détails
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}