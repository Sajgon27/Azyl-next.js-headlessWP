import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import { DivideIcon } from "@heroicons/react/20/solid";

export default function About() {
  return (
    <motion.div
      id="about"
      className="container flex flex-col-reverse md:flex-row md:gap-12  lg:gap-28 pt-20 md:py-20 lg:py-28"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="w-full mt-5 md:mt-0 md:w-[45%] relative">
        <motion.div
          className="w-[45%] hidden lg:block md:w-full max-h-[400px] md:max-h-[800px] h-[300px] md:h-[800px] object-cover  relative"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/onas/image-o-nas-1.jpeg"
            alt="O nas zdjęcie 1"
            fill
            className="border-img object-cover hidden md:block"
          />
        </motion.div>
        <div className=" lg:absolute w-full lg:w-60 h-120 lg:h-90 md:h-180 lg:-bottom-10 lg:-right-10 z-50">
          <Image
            src="/images/onas/image-o-nas-2.jpeg"
            alt="O nas zdjęcie 2"
            width={400}
            height={600}
            className="sm:border-img w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <motion.div
        className="w-full md:w-1/2 mb-4 lg:mb-0"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <span className="text-primary font-medium">O NAS</span>
        <h3 className="text-[2.5rem] sm:text-[3rem] font-semibold leading-[3.2rem] mt-4 mb-8">
          Azyl Psów Zapomnianych
        </h3>
        <p>
          Azyl Psów Zapomnianych w Wołczynie to schronisko, które daje
          schronienie, opiekę i szansę na nowe życie bezdomnym oraz porzuconym
          psom i kotom. Dzięki zaangażowaniu wolontariuszy i darczyńców zapewnia
          im wyżywienie, leczenie oraz poszukiwanie kochających domów. Placówka
          działa na rzecz poprawy losu zwierząt, promując adopcję i
          odpowiedzialną opiekę nad czworonogami. Azyl Psów Zapomnianych w
          Wołczynie to schronisko, które daje schronienie, opiekę i szansę na
          nowe życie bezdomnym oraz porzuconym psom i kotom. Dzięki
          zaangażowaniu wolontariuszy i darczyńców zapewnia im wyżywienie,
          leczenie oraz poszukiwanie kochających domów. Placówka działa na rzecz
          poprawy losu zwierząt, promując adopcję i odpowiedzialną opiekę nad
          czworonogami.
          <br /> <br />
          Azyl Psów Zapomnianych w Wołczynie to schronisko, które daje
          schronienie, opiekę i szansę na nowe życie bezdomnym oraz porzuconym
          psom i kotom. Dzięki zaangażowaniu wolontariuszy i darczyńców zapewnia
          im wyżywienie, leczenie oraz poszukiwanie kochających domów. Placówka
          działa na rzecz poprawy losu zwierząt, promując adopcję i
          odpowiedzialną opiekę nad czworonogami.
        </p>
        <Button
          additionalStyles="w-fit self-start mt-8"
          href="tel:+48 668 782 325"
          bgColor="red"
          icon="/icons/phone.svg"
          text="Skontatuj się z nami"
        />
      </motion.div>
    </motion.div>
  );
}
