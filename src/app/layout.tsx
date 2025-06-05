import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strona główna",
  description: "| Azyl Psów Zapomnianych w Wołczynie",
};
console.log("API Image Base URL:", process.env.NEXT_PUBLIC_API_IMAGES_URL);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`} ${inter.variable} antialiased`}>
        <ScrollToTop />
        <Header />
        {children} <Footer />
      </body>
    </html>
  );
}
