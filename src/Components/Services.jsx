import service from '../assets/services.jpg'
import { FiClock } from 'react-icons/fi'
import { FaCarSide, FaSpa } from 'react-icons/fa'

export default function Services() {
    return (
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                    Nos Différents Services
                </h1>
                <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
                    Découvrez nos services exceptionnels conçus pour rendre votre séjour inoubliable.
                </p>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
                {/* Image */}
                <div className="w-full lg:w-1/2 max-w-md">
                    <img 
                        className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
                        src={service}
                        alt="Nos services" 
                    />
                </div>

                {/* Contenu */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                        Nos Services Exclusifs
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 mb-6 md:mb-8">
                        Des services premium conçus pour votre confort et votre bien-être durant tout votre séjour.
                    </p>
            
                    <div className="space-y-6 md:space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center shrink-0">
                                <FiClock className="text-blue-600 text-lg md:text-xl" aria-hidden />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-medium text-slate-700 mb-2">
                                    Service 24/7 pour un séjour parfait
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Notre équipe est disponible 24h/24 et 7j/7 pour répondre à tous vos besoins.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center shrink-0">
                                <FaCarSide className="text-green-600 text-lg md:text-xl" aria-hidden />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-medium text-slate-700 mb-2">
                                    Transport confortable disponible
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Service de navette et transport privé pour vos déplacements en toute sérénité.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 p-2 bg-purple-50 border border-purple-200 rounded-lg flex items-center justify-center shrink-0">
                                <FaSpa className="text-purple-600 text-lg md:text-xl" aria-hidden />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-medium text-slate-700 mb-2">
                                    Espace détente unique et luxueux
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Spa, piscine et espaces bien-être pour une relaxation totale durant votre séjour.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}