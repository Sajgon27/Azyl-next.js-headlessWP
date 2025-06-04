import Image from "next/image";
import Link from "next/link";
import ContactForm from "../ContactForm";

export default function Contact() {
  return (
    <>
      <div
        id="contact"
        className="container flex flex-col md:flex-row my-12 md:my-24"
      >
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-[30px] font-semibold leading-[37px] my-4">
            Skontaktuj się z nami
          </h3>
          <p className="pr-10">
            Masz pytania dotyczące adopcji, wolontariatu lub wsparcia
            schroniska? Skontaktuj się z nami – chętnie pomożemy!
          </p>
          <a
            href="mailto:azylpsowzapomnianych@op.pl"
            className="flex flex-row gap-3 items-center"
          >
            <Image
              className="size-7"
              src="/icons/email.svg"
              alt="Email"
              width={28}
              height={28}
            />
            azylpsowzapomnianych@op.pl
          </a>
          <a
            href="tel:+48 668 782 325"
            className="flex flex-row gap-3 items-center"
          >
            <Image
              className="size-7"
              src="/icons/darkPhone.svg"
              alt="Telefon"
              width={28}
              height={28}
            />
            +48 668 782 325
          </a>

          <span className="flex flex-row gap-3 items-center">
            <Image
              className="size-7"
              src="/icons/location.svg"
              alt="Lokalizacja"
              width={28}
              height={28}
            />{" "}
            Opolska, Gieralcice, Poland, 46-250
          </span>
          <span className="flex flex-row gap-3 items-center mt-6">
            <Link
              href="https://www.instagram.com/azylpsow/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="size-7"
                src="/icons/instagram.svg"
                alt="Instagram"
                width={28}
                height={28}
              />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100064831895159"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="size-7"
                src="/icons/facebook.svg"
                alt="Facebook"
                width={28}
                height={28}
              />
            </Link>
          </span>
        </div>

        <ContactForm />
      </div>
    </>
  );
}
