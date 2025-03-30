import type { NextConfig } from "next";
import generatePostSlug from "@/utils/generatePostSlug";
const writeupRedirects = {
  "1": "1048576",
  "2": "ProtoGrader",
  "3": "Sea Scavenger",
  "4": "Phone Number",
  "5": "Tic Tac Toe",
  "6": "NoSQL",
  "7": "JSLearning.com",
  "8": "MOC, INC.",
  "9": "Cookie Clicker",
  "10": "Duck Finder",
  "11": "Fogblaze",
  "12": "Michaelsoft Gring",
  "13": "User #1",
  "14": "Frog",
  "15": "Reader",
  "16": "Fetcher",
  "17": "Templater",
  "18": "Music Checkout",
  "19": "Kaboot",
  "20": "Eat Flag Leh",
  "21": "View Source",
  "22": "Baba Loves Pollution",
  "23": "Formhub",
  "24": "Circuitous Vertex Enigma",
  "25": "Baba is Lost",
  "26": "Kaboom",
  "27": "Artistic Odyssey",
  "28": "Language, Labyrinth and (Graphics)Magick",
  "29": "Hardware isnt that Hard!",
  "30": "Noncevigator",
  "31": "Baby Flagchecker",
  "32": "Wallfacer",
  "33": "Shark Lotto",
  "34": "Baby SSTI",
  "35": "Baby SQL",
  "36": "Fanpage",
  "37": "Calculator",
  "38": "Secure Content",
  "39": "Insecure Content",
  "40": "Screenshooter",
  "41": "SSTI Golf",
  "42": "Compressor",
  "43": "Pkiller",
  "44": "Userman",
  "45": "Brute-Force",
  "46": "Unbearable"
};

const blogRedirects = {
  "1": "How we created the SSMCT Website"
}
const nextConfig: NextConfig = {
  redirects: async () => {
    const writeupRedirectsArray = Object.entries(writeupRedirects).map(([key, value]) => ({
      source: `/writeups/view/${key}`,
      destination: `/writeups/view/${generatePostSlug(value, key)}`,
      permanent: true,
    }));
    const blogRedirectsArray = Object.entries(blogRedirects).map(([key, value]) => ({
      source: `/blogs/view/${key}`,
      destination: `/blogs/view/${generatePostSlug(value, key)}`,
      permanent: true,
    }));
    return [
      ...writeupRedirectsArray,
      ...blogRedirectsArray,
    ];     
  },
  /* config options here */
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'zlib-sync'];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ctftime.org',
        port: '',
        pathname: '/media/events/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
