import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
const Chambres = React.lazy(() => import('./Pages/Chambres'));
import Contact from '../src/Pages/Contact';
import Home from './Pages/Home';
import About from '../src/Pages/About';
import Reservation from './Pages/Reservation';
import ChambreDetail from './Pages/ChambreDetail';
import Results from './Pages/Results';
import Paiement from './Pages/Paiement';
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
import Profil from './Pages/Profil';
import PolitiqueCookies from './Pages/PolitiqueCookies';
import CookieBanner from './Components/CookieBanner';

// Créer le client React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<div className="min-h-screen pt-16 md:pt-20 pb-10 px-4 sm:px-6 flex items-center justify-center">Chargement…</div>}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chambres" element={<Chambres />} />
            <Route path="/chambre/:id" element={<ChambreDetail/>} />
            <Route path="/results" element={<Results/>} />
            <Route path="/reservation" element={<Reservation/>} />
            <Route path="/paiement" element={<Paiement/>} />
            <Route path="/connexion" element={<Connexion/>} />
            <Route path="/inscription" element={<Inscription/>} />
            <Route path="/profil" element={<Profil/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/politique-cookies" element={<PolitiqueCookies/>} />
            </Routes>
          </Suspense>
          <Footer />
          <CookieBanner />
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;