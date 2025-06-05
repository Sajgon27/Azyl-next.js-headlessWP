import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-full pt-12 md:pt-auto md:py-12 mt-12 bg-[#FFD0C2]">
      <div className="container flex items-start flex-wrap md:flex-nowrap md:items-center">
        <div className="w-1/2 md:w-[30%]">
          <Image
            className="-ml-3"
            src="/logo.png"
            alt="Logo"
            width={72}
            height={72}
            style={{ width: "72px", height: "72px" }}
            priority
          />
          <div className="flex flex-col gap-3 md:gap-1 text-sm mt-2 text-black/50">
            <span className="flex flex-col md:flex-row">
              Projekt:
              <a
                className="font-bold sm:pl-1"
                href="https://www.behance.net/IvanZaiats_?fbclid=PAZXh0bgNhZW0CMTEAAaYRbx-t3scVV6vASLslWk5B2SEnYFWUNKO2jQ1TvMz_hlgpL6vObUb59qA_aem_lQCuoSL7kxOYIc7kOxBeIg"
              >
                Ivan Zaiats
              </a>
            </span>
            <span className="flex flex-col md:flex-row">
              Wdrożenie:{" "}
              <a className="font-bold sm:pl-1" href="https://smdweb.pl/">
                Szymon Mudrak
              </a>
            </span>
          </div>
        </div>
        <div className="w-1/2 md:w-[70%]">
          <ul className="flex flex-col md:flex-row font-semibold text-md items-start md:items-center justify-end gap-4 lg:gap-8">
            <li>
              <Link href="/#adoption">Zwierzęta do adopcji</Link>
            </li>
            <li>
              <Link href="/galeria">Galeria</Link>
            </li>
            <li>
              <Link href="/#about">O nas</Link>
            </li>
            <li>
              <a
                href="https://zrzutka.pl/cag4dx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wesprzyj nas
              </a>
            </li>
            <li>
              <Link href="/#contact">Kontakt</Link>
            </li>
          </ul>
          <div className="hidden md:flex items-center justify-end gap-2 mt-6 text-black/50 text-sm">
            <span>© 2025 Azyl Psów Zapomnianych w Wołczynie</span>
          </div>
        </div>
        <div className="flex pb-2 pt-6 w-full md:hidden flex-col-reverse items-center justify-center gap-2 mt-6 text-black/50 text-sm">
          <span className="text-[0.8rem] text-center font-bold">
            © 2025 Azyl Psów Zapomnianych w Wołczynie
          </span>
        </div>
      </div>
    </footer>
  );
}
