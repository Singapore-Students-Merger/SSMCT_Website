import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Singapore Students Merger",
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/backgrounds/home.png`,
  },
  keywords: "SSM, Singapore Students Merger, CTF, Cybersecurity, Capture The Flag, Singapore, Students, Merger, NUS, NTU, SMU, SUTD, SIT, RP, SP, TP, CTF Team, CTF Community, Cybersecurity Community, Cybersecurity Team, Cybersecurity Club, Cybersecurity Society, Cybersecurity Group, Cybersecurity Organization, Cybersecurity Team Singapore, Cybersecurity Club Singapore, Cybersecurity Society Singapore, Cybersecurity Group Singapore, Cybersecurity Organization Singapore, Cybersecurity Team NUS, Cybersecurity Club NUS, Cybersecurity Society NUS, Cybersecurity Group NUS, Cybersecurity Organization NUS, Cybersecurity Team NTU, Cybersecurity Club NTU, Cybersecurity Society NTU, Cybersecurity Group NTU, Cybersecurity Organization NTU, Cybersecurity Team SMU, Cybersecurity Club SMU, Cybersecurity Society SMU, Cybersecurity Group SMU, Cybersecurity Organization SMU, Cybersecurity Team SUTD, Cybersecurity Club SUTD, Cybersecurity Society SUTD, Cybersecurity Group SUTD, Cybersecurity Organization SUTD, Cybersecurity Team SIT, Cybersecurity Club SIT, Cybersecurity Society SIT, Cybersecurity Group SIT, Cybersecurity Organization SIT, Cybersecurity Team RP, Cybersecurity Club RP, Cybersecurity Society RP, Cybersecurity Group RP, Cybersecurity Organization RP, Cybersecurity Team SP, Cybersecurity Club SP, Cybersecurity Society SP, Cybersecurity Group SP, Cybersecurity Organization SP, Cybersecurity Team TP, Cybersecurity Club TP, Cybersecurity Society TP, Cybersecurity Group TP, Cybersecurity Organization TP",
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
        {children}
      </body>
    </html>
  );
}
