import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria | Azyl Psów Zapomnianych w Wołczynie",
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <>{children}</>

  );
}
