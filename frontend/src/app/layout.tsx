import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Singapore Students Merger CTF Team | SSMCT",
    template: "%s | SSMCT",
  },
  description: "Singapore Students Merger (SSMCT) is a student-led cybersecurity team that competes in CTFs, hosts events, and builds a vibrant community for learning and collaboration.",
  icons: {
    icon: "/icon.ico",
  },
  openGraph: {
    type: "website",
    title: "Home",
    locale: "en_SG",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    siteName: "Singapore Students Merger CTF Team",
    images: [`${process.env.NEXT_PUBLIC_WEBSITE_URL}/assets/home/about1.png`],
  },
  keywords: "SSMCT, Singapore Students Merger, CTF, Cybersecurity, Capture The Flag, Singapore, Students, Merger, CTF Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <SessionProviderWrapper>
          <Navbar />
        </SessionProviderWrapper>
          <div className="h-16">

          </div>
          <Suspense fallback={<Loading/>} >
          {children}
          <Footer />
          </Suspense>
      </body>
      <GoogleAnalytics gaId="G-LPMB2T0YR9" />
    </html>
  );
}
