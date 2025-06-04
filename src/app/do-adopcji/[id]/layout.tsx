import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adopcja | Azyl Psów Zapomnianych w Wołczynie",
};

export default function SingleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
