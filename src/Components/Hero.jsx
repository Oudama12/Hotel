import React from "react";
import SearchBar from "./SearchBar";
import bg from "../assets/hero-min1.jpg";
import ReservationForm from "./ReservationForm";
import { Link } from "react-router-dom";



export default function Hero() {
  return (
    <div
      className="h-[60vh] sm:h-[70vh] md:h-[80vh] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/50 lg:bg-black/60"></div>

      {/* Contenu texte */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          Bienvenue à FAC HOTEL
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 sm:mb-6 max-w-2xl">
          Votre séjour de rêve commence ici
        </p>
        <Link
          to="/reservation" className="px-6 py-3 sm:px-7 sm:py-3 md:px-8 md:py-4 bg-white hover:bg-gray-500 text-gray-900 hover:text-white rounded-full font-medium text-sm sm:text-base cursor-pointer transition-all duration-300 transform hover:scale-105">
          Réserver Maintenant
        </Link>
      </div>

      {/* SearchBar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-5 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 w-full px-4 sm:px-6 z-20">
        <SearchBar />
      </div>
    </div>
  );
}