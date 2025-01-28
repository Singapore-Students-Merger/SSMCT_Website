import { getCategories } from "@/app/api/categories/route";
import Posts from "@/components/Posts";
import { getBlogs } from "@/app/api/blogs/route";
import { getTopics } from "@/app/api/topics/route";
import { getEvents } from "@/app/api/events/route";
import BlogHero from "./BlogHero";
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