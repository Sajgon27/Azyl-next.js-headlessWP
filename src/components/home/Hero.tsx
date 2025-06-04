"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden md:mb-22">
  
      <div className="absolute inset-0 bg-white opacity-20 -z-10"></div>
      <div className="container py-12 md:py-28 lg:py-42 flex flex-wrap md:flex-nowrap flex-row gap-18 items-stretch justify-between">
        <div className="w-full md:w-1/2 flex flex-col gap-y-5">
          <h1 className="text-[2rem] xl:text-[3rem] font-semibold  ">
            Daj dom, zyskaj miłość
          </h1>
          <p className="">
            Azyl Psów Zapomnianych w Wołczynie to schronisko, które daje
            schronienie, opiekę i szansę na nowe życie bezdomnym oraz porzuconym
            psom i kotom. <br/><br/>Dzięki zaangażowaniu wolontariuszy i darczyńców
            zapewnia im wyżywienie, leczenie oraz poszukiwanie kochających
            domów. Placówka działa na rzecz poprawy losu zwierząt, promując
            adopcję i odpowiedzialną opiekę nad czworonogami.
          </p>
          <Button
            additionalStyles="w-auto self-start"
            href="tel:+48 668 782 325"
            bgColor="red"
            icon="/icons/phone.svg"
            text="Skontatuj się z nami"
          />
        </div>
        <div className="w-full md:w-1/2 text-center relative gap-2 justify-around flex flex-wrap lg:block">
          <motion.div
            className="w-[35%] lg:size-76 lg:absolute left-5 -top-14 z-1 object-cover"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/hero/hero2.jpg"
              alt="Hero 2"
              className="object-cover border-img"
              fill
            />
          </motion.div>
          <motion.div
            className="w-[60%] lg:w-82 h-62 cover lg:absolute right-5 -top-20 z-1 object-cover"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="/images/hero/hero1.jpg"
              alt="Hero 1"
              className="object-cover border-img"
              fill
            />
          </motion.div>
          <motion.div
            className="w-[60%] lg:w-82 h-68 lg:absolute -bottom-20 left-16 z-3 object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src="/images/hero/hero4.jpg"
              alt="Hero 4"
              className="object-cover border-img "
              fill
            />
          </motion.div>
          <motion.div
            className="w-[30%] lg:size-68 lg:absolute -right-1 -bottom-2 z-3 object-cover"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Image
              src="/images/hero/hero3.jpg"
              alt="Hero 3"
              className="object-cover border-img "
              fill
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
