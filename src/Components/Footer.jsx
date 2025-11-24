export default function Footer() {
    return (
        <footer className="bg-black text-gray-500 py-12 md:py-16">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
                    {/* Logo et description */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <span className="text-2xl font-bold text-white">FAC HOTEL</span>
                        </div>
                        <p className="text-sm md:text-base max-w-md">
                            Votre séjour de rêve commence ici. Découvrez le confort et l'élégance à chaque visite.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-dribbble">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                                    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-linkedin">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-twitter">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-youtube">
                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                                    <path d="m10 15 5-3-5-3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Liens Navigation */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm md:text-base">Navigation</h3>
                        <ul className="space-y-2 md:space-y-3 text-sm">
                            <li><a href="/" className="hover:text-white transition-colors">Accueil</a></li>
                            <li><a href="/chambres" className="hover:text-white transition-colors">Chambres</a></li>
                            <li><a href="/reservation" className="hover:text-white transition-colors">Réservation</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors">À propos</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm md:text-base">Services</h3>
                        <ul className="space-y-2 md:space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Hébergement</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Restauration</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Événements</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Spa & Bien-être</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Transport</a></li>
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm md:text-base">Légal</h3>
                        <ul className="space-y-2 md:space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        © 2024 FAC HOTEL. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}