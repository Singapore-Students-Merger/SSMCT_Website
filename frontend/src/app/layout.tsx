import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
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
    default: "Singapore Students Merger - Singapore's Biggest CTF Team",
    template: "%s | Singapore Students Merger",
  },
  description: "Singapore Students Merger (SSM) is a team of passionate students from across Singapore who love cybersecurity. We compete in CTFs, organize events, and create a welcoming space to learn, grow, and connect with others who share our enthusiasm.",
  icons: {
    icon: "/icon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Singapore Students Merger",
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/backgrounds/home.png`,
  },
  keywords: "SSM, Singapore Students Merger, CTF, Cybersecurity, Capture The Flag, Singapore, Students, Merger, CTF Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading/>} >
        {children}
        </Suspense>
      </body>
      <GoogleAnalytics gaId="G-LPMB2T0YR9" />
    </html>
  );
}
