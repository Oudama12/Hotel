import user_1 from '../assets/user-1.png';
import user_2 from '../assets/user-2.png';
import user_3 from '../assets/user-3.png';
import user_4 from '../assets/user-4.png';

const Testimonials = () => {
    const cardsData = [
        {
            image: user_2,
            name: 'Briar Martin',
            handle: '@neilstellar',
            text: 'Un séjour exceptionnel ! Le service était impeccable et la chambre magnifique.'
        },
        {
            image: user_1,
            name: 'Avery Johnson',
            handle: '@averywrites',
            text: 'L\'expérience parfaite. Je recommande vivement cet hôtel pour un séjour de rêve.'
        },
        {
            image: user_4,
            name: 'Gandhi',
            handle: '@jordantalks',
            text: 'Le confort et l\'attention aux détails ont rendu mon séjour mémorable.'
        },
        {
            image: user_3,
            name: 'Sophie Martinez',
            handle: '@sophietravels',
            text: 'Service client exceptionnel et installations de qualité supérieure.'
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-64 sm:w-72 md:w-80 shrink-0 mx-2 sm:mx-3">
            <div className="flex items-center gap-3 mb-4">
                <img className="size-10 sm:size-12 rounded-full object-cover" src={card.image} alt="User" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{card.name}</p>
                        <svg className="mt-0.5 fill-blue-500 flex-shrink-0" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                        </svg>
                    </div>
                    <span className="text-xs text-slate-500 truncate block">{card.handle}</span>
                </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
        </div>
    );

    return (
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                * { font-family: 'Poppins', sans-serif; }
                
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-inner { animation: marqueeScroll 30s linear infinite; }
                .marquee-reverse { animation-direction: reverse; }
                
                @media (max-width: 768px) {
                    .marquee-inner { animation-duration: 40s; }
                    .marquee-reverse { animation-duration: 35s; }
                }
            `}</style>
            
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                    Témoignages de Nos Clients
                </h1>
                <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                    Découvrez ce que nos clients disent de leur expérience chez FAC HOTEL
                </p>
            </div>

            {/* Version Mobile - Stack Vertical */}
            <div className="lg:hidden space-y-6 max-w-2xl mx-20">
                {cardsData.map((card, index) => (
                    <CreateCard key={index} card={card} />
                ))}
            </div>

            {/* Version Desktop - Marquee */}
            <div className="hidden lg:block">
                <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative mb-8">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                    <div className="marquee-inner flex transform-gpu min-w-[200%] py-6">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>

                <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-6">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;