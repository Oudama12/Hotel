import g_1 from '../assets/g1.jpg'
import g_2 from '../assets/g2.jpg'
import g_3 from '../assets/g3.jpg'
import g_4 from '../assets/g4.jpg'
import g_5 from '../assets/g5.jpg'
import g_7 from '../assets/g7.jpg'

export default function Gallery() {
    const galleryImages = [
        { src: g_1, alt: "Espace détente" },
        { src: g_2, alt: "Hall-1" },
        { src: g_3, alt: "Hall-2" },
        { src: g_4, alt: "Hall-3" },
        { src: g_5, alt: "Espace de détente-2" },
        { src: g_7, alt: "Spa" }
    ];

    

    return (
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>
            
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                    Notre Galerie
                </h1>
                <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                    Découvrez les espaces exceptionnels de FAC HOTEL - chaque détail conçu pour votre confort et bien-être.
                </p>
            </div>

            {/* Version Mobile - Grille */}
            <div className="lg:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {galleryImages.map((image, index) => (
                            <div 
                                key={index}
                                className="relative group rounded-lg overflow-hidden cursor-pointer h-48 sm:h-56"
                        >
                            <img 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                src={image.src}
                                alt={image.alt} 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                                <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                                    {image.alt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Version Desktop - Effet Hover Original */}
                <div className="hidden lg:flex items-center gap-4 h-[400px] w-full max-w-6xl mx-auto">
                {galleryImages.map((image, index) => (
                    <div 
                        key={index}
                        className="relative group grow transition-all w-40 h-[400px] duration-500 hover:w-full cursor-pointer"
                    >
                        <img 
                            className="h-full w-full object-cover rounded-lg group-hover:rounded-l-lg group-first:hover:rounded-l-lg group-last:hover:rounded-r-lg transition-all duration-500"
                            src={image.src}
                            alt={image.alt} 
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                            <p className="text-lg font-semibold">{image.alt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}