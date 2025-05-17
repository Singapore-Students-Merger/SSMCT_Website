import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Kode_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ctf/Navbar";
import Footer from "@/components/ctf/Footer";

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
  display: "swap",

});

export const metadata: Metadata = {
  title: {
    default: "SSMCTF | Singapore Students Merger Capture The Flag",
    template: "%s | SSMCTF",
  },
  description: "The Singapore Students Merger Capture the Flag (SSMCTF) is a beginner-friendly Capture The Flag competition targetted at students in Singapore, providing fun challenges for participants to tackle.",
  icons: {
    icon: "/icon.ico",
  },
  openGraph: {
    type: "website",
    title: "SSMCTF | Singapore Students Merger Capture The Flag",
    locale: "en_SG",
    url: "https://ssmct.org",
    siteName: "Singapore Students Merger CTF Team",
    images: [`https://ctf.ssmct.org/images/ssmctf.png`],
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
        className={`${kodeMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-D6MPMKY4TV" />
    </html>
  );
}
