// src/hooks/useGsap.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useGsap = () => {
  const el = useRef();

  useEffect(() => {
    // Animations GSAP ici
    if (el.current) {
      gsap.from(el.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
      });
    }
  }, []);

  return el;
};