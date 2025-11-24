import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import room_1 from '../assets/room1.jpg';
import room_2 from '../assets/room2.jpg';
import room_3 from '../assets/room3-min.jpg';
import room_4 from '../assets/room4.jpg';
import room_5 from '../assets/room5.jpg';
import room_6 from '../assets/room6.jpg';
import room_7 from '../assets/room7.jpg';
import { roomService } from '../services/roomService';

// Mapping des images
const imageMap = {
  room_1, room_2, room_3, room_4, room_5, room_6, room_7
};

const Chambres = () => {
    const [stopScroll, setStopScroll] = React.useState(false);
    const navigate = useNavigate();

    // Utilisation de React Query pour récupérer les chambres
    const { data: cardData, isLoading, error } = useQuery({
        queryKey: ['rooms'],
        queryFn: roomService.getRooms,
    });

    const handleRoomClick = (chambreId) => {
        navigate(`/chambre/${chambreId}`);
    };

    // États de chargement et d'erreur
    if (isLoading) {
        return (
            <div className="min-h-screen pt-16 md:pt-20 pb-10 px-4 sm:px-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des chambres...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-16 md:pt-20 pb-10 px-4 sm:px-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
                    <p className="text-gray-600">Impossible de charger les chambres. Veuillez réessayer.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-16 md:pt-20 pb-10 px-4 sm:px-6">
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @media (max-width: 768px) {
                    .marquee-inner {
                        animation-duration: ${cardData.length * 4000}ms !important;
                    }
                }
            `}</style>
            
            {/* En-tête */}
            <div className="text-center mb-8 md:mb-12 mt-20">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                    Présentation de Nos Chambres
                </h1>
                <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto px-4">
                    Découvrez nos chambres les plus appréciées - chaque espace conçu pour votre confort et bien-être.
                </p>
            </div>

            {/* Version Mobile - Grille Simple */}
            <div className="md:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {cardData.map((card) => (
                        <div 
                            key={card.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                            onClick={() => handleRoomClick(card.id)}
                        >
                            <img 
                                src={imageMap[card.image]} 
                                alt={card.title}
                                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                                <p className="text-green-600 font-bold text-sm">{card.priceFormatted}</p>
                                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    Voir détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Version Desktop - Marquee Animé */}
            <div className="hidden md:block overflow-hidden w-full relative max-w-6xl mx-auto my-8 lg:my-12 " 
                 onMouseEnter={() => setStopScroll(true)} 
                 onMouseLeave={() => setStopScroll(false)}>
                
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                
                <div className="marquee-inner flex w-fit" 
                     style={{ 
                         animationPlayState: stopScroll ? "paused" : "running", 
                         animationDuration: cardData.length * 2500 + "ms" 
                     }}>
                    <div className="flex">
                        {[...cardData, ...cardData].map((card, index) => (
                            <div 
                                key={index} 
                                className="w-64 lg:w-72 xl:w-80 mx-3 lg:mx-4 h-[22rem] lg:h-[24rem] relative group hover:scale-95 transition-all duration-300 cursor-pointer"
                                onClick={() => handleRoomClick(card.id)}
                            >
                                    <img 
                                        src={imageMap[card.image]} 
                                        alt={card.title} 
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                <div className="flex flex-col items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/40 rounded-lg">
                                    <p className="text-white text-lg lg:text-xl font-semibold text-center mb-2">{card.title}</p>
                                    {card.priceFormatted && (
                                        <p className="text-white text-md lg:text-lg mb-4">{card.priceFormatted}</p>
                                    )}
                                    <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm lg:text-base">
                                        Voir détails
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="absolute right-0 top-0 h-full w-20 lg:w-32 xl:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </div>
    );
}

export default Chambres;