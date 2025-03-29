import getCategories from "@/utils/getCategories";
import Posts from "@/components/Posts";
import  getBlogs  from "@/utils/getBlogs";
import getTopics from "@/utils/getTopics";
import getEvents from "@/utils/getEvents";
import BlogHero from "./BlogHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read insightful blogs from Singapore Students Merger (SSM) covering cybersecurity, CTF strategies, ethical hacking, and tech trends. Stay updated with our community discussions and events.",
  openGraph: {
    type: "website",
    locale: "en_SG",
    title: "Blogs",
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/blogs`,
    siteName: "Singapore Students Merger",
    images: [`${process.env.NEXT_PUBLIC_WEBSITE_URL}/backgrounds/home.png`],
  },
  keywords: ["SSM", "Singapore Students Merger", "CTF", "Cybersecurity", "Capture The Flag", "Singapore", "Students", "Merger", "CTF Team"
    ,"Blogs","CTF Blogs"
  ],
};

export const dynamic = "force-dynamic";

export default async function BlogsPageServer() {
  let data = await getBlogs();
  const categories = await getCategories();
  const topics = await getTopics();
  const events = await getEvents();
  data = data.map((writeup) => {
    console.log(writeup)
    if (!writeup.thumbnail) {
      const category = categories.find((category) => category.name === writeup.category);
      writeup.thumbnail = `/assets/${category?.thumbnail ?? ""}`;
    }
    return writeup;
  }
  )
  const featured = data.find((blog) => blog.featured)??data[0];

  return (
    <>
      <BlogHero featured = {featured}/>
      <Posts type = "blog" data = {data} categories = {categories} topics = {topics} events = {events}/>
    </>
  );
}