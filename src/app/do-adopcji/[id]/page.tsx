"use client";
import { useEffect, useState } from "react";

import client from "../../../../apollo-client";
import gql from "graphql-tag";
import { useParams } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ContactForm from "@/components/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

interface AnimalData {
  title: string;
  databaseId: number;
  featuredImage: {
    node: {
      id: string;
      uri: string;
    };
  };
  zwierzetaAcf: {
    wiek: string;
    plec: string;
    typ: string;
    opis: string;
    galeria: {
      nodes: {
        id: string;
        uri: string;
      }[];
    };
  };
}

export default function Animal() {
  const params = useParams();
  const [animal, setAnimal] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const id = params.id;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await client.query({
        query: gql`
          query GetPortfolioById($id: ID!) {
            zwierze(id: $id, idType: DATABASE_ID) {
              title
         
              databaseId
              featuredImage {
                node {
                  id
                  uri
                }
              }
              zwierzetaAcf {
                wiek
                plec
                typ
                opis
                galeria {
                  nodes {
                    id
                    uri
                  }
                }
              }
            }
          }
        `,
        variables: { id }, // 👈 Pass the ID variable here
      });
    
      setAnimal(data.zwierze);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading additionalStyles="h-[70vh]" />;

  if (error || !animal) return <Error />;

  const allImages = [
    { src: process.env.NEXT_PUBLIC_API_IMAGES_URL + animal.featuredImage.node.uri },
    ...animal.zwierzetaAcf.galeria.nodes.map((img) => ({
      src: process.env.NEXT_PUBLIC_API_IMAGES_URL + img.uri,
    })),
  ];
console.log("Animal data:", animal.featuredImage.node.uri); // 👀
  return (
    <div className="container py-16">
      <div>
        <h1 className="text-[48px] font-semibold leading-[60px]">
          {animal.title}
        </h1>
        <span className="flex items-center gap-2 mt-4">
          <img
            className="size-6"
            src="/icons/locationRed.svg"
            alt="Location Icon"
          />
          Azyl Psów Zapomnianych w Wołczynie
        </span>
      </div>

      <div className="flex md:flex-row flex-col-reverse items-top gap-12 mt-10">
        <div className="w-full md:w-1/2">
          <div className="w-full mb-6 ">
            <h5 className="text-[36px] font-semibold block md:hidden mb-4">
              Galeria
            </h5>
            <img
              src={process.env.NEXT_PUBLIC_API_IMAGES_URL + animal.featuredImage.node.uri}
              alt="Główne zdjęcie zwierzaka"
              className="w-full max-h-[500px] md:max-h-[600px] border-img object-cover  cursor-pointer "
              onClick={() => {
                setIndex(0);
                setOpen(true);
              }}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-4 overflow-x-auto">
            {animal.zwierzetaAcf.galeria.nodes.map((img, i) => (
              <img
                key={i}
                src={process.env.NEXT_PUBLIC_API_IMAGES_URL + img.uri}
                alt={`Miniaturka ${i + 1}`}
                className="w-[calc(50%-0.5rem)] sm:w-[calc(33%-0.5rem)] lg:w-[calc(25%-0.5rem)] h-40  object-cover cursor-pointer border-img"
                onClick={() => {
                  setIndex(i + 1);
                  setOpen(true);
                }}
              />
            ))}
          </div>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={allImages}
            index={index}
            on={{
              view: ({ index }) => setIndex(index),
            }}
          />
        </div>

        <div className="w-full md:w-1/2 space-y-8">
          <p>{animal.zwierzetaAcf.opis}</p>
          <div className="flex items-center gap-8">
            <span className="flex gap-2">
              <img src="/icons/calendar.svg" />
              Wiek: {animal.zwierzetaAcf.wiek}
            </span>
            <span className="flex gap-2">
              <img
                src={`${
                  animal.zwierzetaAcf.plec == "Samiec"
                    ? "/icons/sexBlue.svg"
                    : "/icons/sexPink.svg"
                }`}
              />
              Płeć: {animal.zwierzetaAcf.plec}
            </span>
          </div>

          <h3 className="font-semibold text-[24px] leading-[32px]">
            Zapytaj o adopcję
          </h3>
          <div></div>
          <ContactForm additionalStyles="md:w-full" />
          <p className="text-sm">
            Adopcja zwierzaka to odpowiedzialna decyzja, która daje mu drugą
            szansę na szczęśliwe życie. Aby zapewnić dobrostan naszych
            podopiecznych, adopcja odbywa się na podstawie umowy adopcyjnej.
            Dokument ten określa warunki opieki nad zwierzęciem i zobowiązania
            nowego opiekuna. Przed adopcją przeprowadzamy rozmowę, by upewnić
            się, że zwierzak trafi do odpowiedniego domu.
          </p>
        </div>
      </div>
    </div>
  );
}
