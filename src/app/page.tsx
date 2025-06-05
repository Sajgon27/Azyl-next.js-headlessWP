"use client";
import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import HomeGallery from "@/components/home/Gallery";
import Sponsors from "@/components/home/Sponsors";
import Contact from "@/components/home/Contact";
import AnimalsCatalog from "@/components/home/AnimalsCatalog";

export default function Home() {
  return (
    <>
      <Hero />
      <AnimalsCatalog />
      <Sponsors />
      <About />
      <HomeGallery />
      <Contact />
    </>
  );
}
