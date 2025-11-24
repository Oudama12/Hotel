export default function Contact() {
    return (
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>
            
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
                <span className="text-2xl sm:text-3xl md:text-4xl bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-full inline-block mb-4">
                    Nous Contacter
                </span> 
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Entrons en contact
                </h1>
                <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
                    Ou contactez-nous directement par email à 
                    <a href="mailto:contact@fachotel.com" className="text-blue-600 hover:underline ml-1">
                        contact@fachotel.com
                    </a>
                </p>
            </div>
            
            <div className="max-w-md sm:max-w-lg mx-auto">
                <form className="space-y-6">
                    {/* Nom Complet */}
                    <div>
                        <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Nom Complet *
                        </label>
                        <div className="flex items-center h-12 sm:h-14 pl-4 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#6B7280"/>
                            </svg>
                            <input 
                                type="text" 
                                id="name"
                                className="h-full px-3 w-full outline-none bg-transparent text-sm sm:text-base"
                                placeholder="Votre nom complet" 
                                required 
                            />
                        </div>
                    </div>
        
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Adresse Email *
                        </label>
                        <div className="flex items-center h-12 sm:h-14 pl-4 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="#6B7280"/>
                            </svg>
                            <input 
                                type="email" 
                                id="email"
                                className="h-full px-3 w-full outline-none bg-transparent text-sm sm:text-base"
                                placeholder="votre@email.com" 
                                required 
                            />
                        </div>
                    </div>
        
                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Message *
                        </label>
                        <textarea 
                            id="message"
                            rows="4" 
                            className="w-full p-4 bg-transparent border border-gray-300 rounded-xl resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                            placeholder="Votre message..." 
                            required
                        ></textarea>
                    </div>
                    
                    {/* Bouton Soumission */}
                    <button 
                        type="submit" 
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl transition-colors text-sm sm:text-base font-medium"
                    >
                        Soumettre le Formulaire
                        <svg className="mt-0.5" width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="#fff"/>
                        </svg>
                    </button>
                </form>
            </div>
        </section>
    );
}