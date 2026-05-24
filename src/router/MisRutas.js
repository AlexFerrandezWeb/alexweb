import React, { useEffect } from 'react'
import {Routes, Route, BrowserRouter, useLocation} from "react-router-dom";
import {Inicio} from '../components/Inicio';
import {Servicios} from '../components/Servicios';
import {SobreMi} from '../components/SobreMi';
import {Contacto} from '../components/Contacto';
import { PoliticaCookies } from '../components/PoliticaCookies';
import { PoliticaPrivacidad } from '../components/PoliticaPrivacidad';
import { AvisoLegal } from '../components/AvisoLegal';
import { CookieBanner } from '../components/CookieBanner';
import { HeaderNav } from '../components/layout/HeaderNav';
import { Footer } from '../components/layout/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const MisRutas = () => {
  return (
    <BrowserRouter>
        <ScrollToTop />

        {/* HEADER Y NAVEGACIÓN */}
        <HeaderNav/>

        {/* CONTENIDO CENTRAL */}
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/sobreMi" element={<SobreMi />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/politica-cookies" element={<PoliticaCookies />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
        </Routes>

        {/* FOOTER */}
        <Footer/>

        {/* BANNER DE COOKIES */}
        <CookieBanner />
    </BrowserRouter>
  )
}
