import React from "react";
import AboutUs from "../Components/AboutUs";
import Services from "../Components/Services";
import Testimonials from "../Components/Testimonials";

export default function About() {
  return (
    <div className="pt-16 md:pt-20">
      <AboutUs />
      <Services />
      <Testimonials />
    </div>
  );
}