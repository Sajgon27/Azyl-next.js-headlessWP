"use client";
import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import HomeGallery from "@/components/home/Gallery";
import Sponsors from "@/components/home/Sponsors";
import Contact from "@/components/home/Contact";
import AnimalsCatalog from "@/components/home/AnimalsCatalog";

export default function Home() {
  console.log("API Image Base URL:", process.env.NEXT_PUBLIC_API_IMAGES_URL);
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
