import getCategories from "@/utils/getCategories";
import getWriteups from "@/utils/getWriteups";
// import getTopics from "@/utils/getTopics";
// import getEvents from "@/utils/getEvents";
import Posts from "@/components/Posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writeups",
  description: "Explore detailed CTF writeups from Singapore Students Merger (SSM). Learn cybersecurity techniques, exploit analysis, and problem-solving strategies from past competitions.",
  openGraph: {
    type: "website",
    locale: "en_SG",
    title: "Writeups",
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/writeups`,
    siteName: "Singapore Students Merger CTF Team",
    images: [`${process.env.NEXT_PUBLIC_WEBSITE_URL}/assets/home/about3.png`],
  },
  keywords: ["SSM", "Singapore Students Merger", "CTF", "Cybersecurity", "Capture The Flag", "Singapore", "Students", "Merger", "CTF Team"
    ,"Writeups","CTF Writeups"
  ],
};

export const dynamic = "force-dynamic";

export default async function WriteupsPageServer() {
  let data = await getWriteups();
  const categories = await getCategories();
  // const topics = await getTopics();
  // const events = await getEvents();
  const uniqueTopics = new Set<string>();
  const uniqueEvents = new Set<string>();
  data = data.map((writeup) => {
    writeup.topics.forEach((topic) => uniqueTopics.add(topic));
    if (writeup.ctf) uniqueEvents.add(writeup.ctf);
    if (!writeup.thumbnail) {
      const category = categories.find((category) => category.name === writeup.category);
      writeup.thumbnail = `/writeups/images/${category?.thumbnail ?? ""}`;
      console.log(writeup.thumbnail);
    }
    return writeup;
  }
  )
  const topics = Array.from(uniqueTopics).map((title,idx) => ({title:title,id:idx}));
  const events = Array.from(uniqueEvents).map((title,idx) => ({title:title,id:idx}));

  return (
    <Posts data = {data} categories = {categories} topics = {topics} events = {events} type = {"writeup"}/>
  );
}