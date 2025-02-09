import GalleryPage from './GalleryPage';
import { Info } from '@/components/Gallery';
import getGalleryData from '@/utils/getGalleryData';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the Singapore Students Merger (SSM) Gallery – showcasing moments from CTF competitions, bonding sessions, and more. Explore our journey in ethical hacking and problem-solving!",
  openGraph: {
    type: "website",
    locale: "en_SG",
    title: "Gallery",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
    siteName: "Singapore Students Merger",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/backgrounds/gallery.jpg`],
  },
  keywords: ["SSM", "Singapore Students Merger", "CTF", "Cybersecurity", "Capture The Flag", "Singapore", "Students", "Merger", "CTF Team"
    ,"Gallery","CTF Gallery"
  ],
};

const GalleryPageServer = async () => {
  const data: Info[] = await getGalleryData();

  return <GalleryPage data={data} />;
};

export default GalleryPageServer;
