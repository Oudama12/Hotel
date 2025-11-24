import React from "react";
import Hero from '../Components/Hero';
import Rooms from "../Components/Rooms";
import AboutUs from "../Components/AboutUs";
import Services from "../Components/Services";
import Testimonials from "../Components/Testimonials";
import Gallery from "../Components/Gallery";
import Contact from "../Components/Contact";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Rooms/>
      <AboutUs/>
      <Services/>
      <Testimonials/>
      <Gallery/>
      <Contact/>
    </div>
  );
}