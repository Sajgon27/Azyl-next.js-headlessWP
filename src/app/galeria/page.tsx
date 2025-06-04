"use client";
import { useState } from "react";
import Image from "next/image";
import { galleryImages } from "./images";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Ensure you import styles

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Transform galleryImages into the correct format
  const slides = galleryImages.map((img) => ({ src: img }));
  console.log(slides[0]);
  return (
    <>
      <div className="w-full relative h-[300px] bg-[url(/images/header-bg.jpg)] bg-center bg-cover ">
      <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex items-center justify-center h-full container ">
          <h1 className="text-[3rem] z-10 font-semibold text-white">Galeria</h1>
        </div>
      </div>

      <div className="container flex flex-col py-22">
        <div className="flex gap-4 flex-wrap">
          {galleryImages.map((slide, i) => (
            <div
              key={i}
              className="relative h-90 flex-[100%] sm:flex-[calc(33.33%-1rem)] max-h-80 object-cover"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                key={i}
                fill
                className=" object-cover cursor-pointer border-img gallery-img"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={galleryImages} // Pass transformed slides
          index={index}
          on={{ view: ({ index }) => setIndex(index) }}
        />
      </div>
    </>
  );
};

export default Gallery;
