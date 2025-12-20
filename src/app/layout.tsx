import type { Metadata } from "next";
import localFont from "next/font/local"; // Impor localFont
import { Geist, Geist_Mono } from "next/font/google"; // Font default Next.js (Bagus, mirip Vercel)
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const googleSans = localFont({
  src: [
    {
      path: "../../public/fonts/Google_Sans_Flex/google-sans.ttf", // Sesuaikan path dengan lokasi file Anda
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-google-sans", // Variabel CSS
});

export const metadata: Metadata = {
  title: "AetrVoid",
  description: "Kare's personal portfolio (waifus showcase) website showcasing projects, skills, and experience in web development and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${googleSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}