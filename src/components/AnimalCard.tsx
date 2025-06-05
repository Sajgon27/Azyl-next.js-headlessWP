import Button from "./ui/Button";
import Image from "next/image";
import Link from "next/link";

interface AnimalCardProps {
  href: string;
  name: string;
  age: string;
  sex: string;
  image: string;
}

function AnimalCard({ href, name, age, sex, image }: AnimalCardProps) {
  return (
    <Link href={href} className="flex flex-col ">
      <img
      width={400}
      height={800}
        alt={name}
        className="w-full hover:scale-[1.01] transition-transform duration-700 ease-in-out object-cover h-[320px] sm:h-[300px] md:h-[420px] border-img"
        src={image}
      />
      <h5 className="text-[16px] sm:text-[20px] font-bold mt-4 mb-2">{name}</h5>
      <div className="flex justify-between flex-col gap-2 lg:flex-row text-[14px] sm:text-base">
        <span className="flex gap-2">
          Wiek: {age}{" "}
          <Image
            src="/icons/calendar.svg"
            width={20}
            height={20}
            alt="Kalendarz"
          />
        </span>
        <span className="flex gap-2">
          Płeć: {sex}{" "}
          <Image
            src={`${
              sex == "Samiec" ? "/icons/sexBlue.svg" : "/icons/sexPink.svg"
            }`}
            width={20}
            height={20}
            alt="Płeć"
          />
        </span>
      </div>

      <Button
        iconMobile={true}
        additionalStyles="mt-3 sm:mt-6 text-[12px] px-2! md:px-6 lg:text-base"
        text="ZOBACZ WIĘCEJ"
        bgColor="red"
        icon="/icons/bone.svg"
      />
    </Link>
  );
}

export default AnimalCard;
