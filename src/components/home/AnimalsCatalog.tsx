"use client";
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import AnimalCard from "../AnimalCard";
import Button from "../ui/Button";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { gql } from "@apollo/client";
import client from "../../graphql/apollo-client";

function AnimalsCatalog() {
  const [animals, setAnimals] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await client.query({
        query: gql`
          query GetZwierzes {
            zwierzeta {
              nodes {
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
                }
              }
            }
          }
        `,
      });
      
      setAnimals(data.zwierzeta.nodes);
      if(!data.zwierzeta) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const [visibleCount, setVisibleCount] = useState(6);
  const [psyOrKoty, setPsyOrKoty] = useState("Pies");

  const handleShowMore = () => setVisibleCount((prev) => prev + 6);
  const handleChangePsyOrKoty = (category: string) => {
    setPsyOrKoty(category);
    setVisibleCount(6);
  };

  const filteredAnimals = animals.filter(
    (animal: any) => animal.zwierzetaAcf.typ[0] === psyOrKoty
  );
  console.log("Filtered Animals:", filteredAnimals);


  return (
    <div id="adoption" className="container py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-[2.5rem] font-semibold leading-[37px]">
          Zwierzęta do adopcji
        </h2>
        <div className="flex flex-row gap-8 mt-5 md:mt-auto">
          <Button
            additionalStyles="w-auto self-start"
            bgColor={psyOrKoty === "Pies" ? "red" : "white"}
            icon={
              psyOrKoty === "Pies" ? "/icons/dogWhite.svg" : "/icons/dogRed.svg"
            }
            text="Psy"
            onClick={() => handleChangePsyOrKoty("Pies")}
          />
          <Button
            additionalStyles="w-auto self-start"
            bgColor={psyOrKoty === "Kot" ? "red" : "white"}
            icon={
              psyOrKoty === "Kot" ? "/icons/catWhite.svg" : "/icons/catRed.svg"
            }
            text="Koty"
            onClick={() => handleChangePsyOrKoty("Kot")}
          />
        </div>
      </div>
       {error && <Error />}
      {loading && <Loading />}
     
      <div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-y-16 mt-10"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.9 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { staggerChildren: 0.15, ease: "easeOut" },
            },
            exit: {
              opacity: 0,
              y: -20,
              scale: 0.85,
              transition: { duration: 0.3, ease: "easeInOut" },
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredAnimals.slice(0, visibleCount).map((animal: any) => (
              <motion.div
                key={animal.databaseId}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                  exit: {
                    opacity: 0,
                    y: -20,
                    scale: 0.85,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  },
                }}
                className="relative"
              >
                <AnimalCard
                  image={
                    process.env.NEXT_PUBLIC_API_IMAGES_URL +
                    animal.featuredImage.node.uri
                  }
                  name={animal.title}
                  href={`/do-adopcji/${animal.databaseId}`}
                  age={animal.zwierzetaAcf.wiek}
                  sex={animal.zwierzetaAcf.plec[0]}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < filteredAnimals.length && (
          <Button
            additionalStyles="m-auto mt-10"
            text="Pokaż więcej"
            bgColor="white"
            icon="/icons/arrowDown.svg"
            onClick={handleShowMore}
          />
        )}
      </div>
    </div>
  );
}

export default AnimalsCatalog;
