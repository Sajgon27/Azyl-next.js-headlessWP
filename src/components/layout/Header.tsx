"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import Button from "../ui/Button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="w-full py-4 shadow-md bg-white">
      <div className="container flex justify-between items-center gap-4 lg:gap-8">
        <Link className="md:flex-1 flex-0" href="/">
          <img className="max-w-[80px]" src="/logo.png" alt="Logo" />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-10 lg:text-[18px]">
          <Link
            href="/#adoption"
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Zwierzęta do adopcji
          </Link>
          <Link
            className="transition-transform duration-300 ease-in-out hover:scale-105"
            href="/galeria"
          >
            Galeria
          </Link>
          <Link
            href="/#about"
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          >
            O nas
          </Link>
          <Link
            href="/#contact"
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Kontakt
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button
            href="https://zrzutka.pl/cag4dx"
            bgColor="red"
            icon="/icons/heart.svg"
            text="Wesprzyj nas"
          />
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          ref={buttonRef}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute w-full left-0 top-[110px] z-50"
        >
          <ul className="flex flex-col items-center gap-4 py-4 text-lg">
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
              <Link href="/#contact">Kontakt</Link>
            </li>

            <li>
              <Button
                href="https://zrzutka.pl/cag4dx"
                bgColor="red"
                icon="/icons/heart.svg"
                text="Wesprzyj nas"
              />
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
