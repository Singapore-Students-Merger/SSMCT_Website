import { getCategories } from "@/app/api/categories/route";
import { getWriteups } from "@/app/api/writeups/route";
import { getTopics } from "@/app/api/topics/route";
import { getEvents } from "@/app/api/events/route";
import Posts from "@/components/Posts";
export default async function WriteupsPageServer() {
  let data = await getWriteups();
  const categories = await getCategories();
  const topics = await getTopics();
  const events = await getEvents();
  data = data.map((writeup) => {
    if (!writeup.thumbnail) {
      const category = categories.find((category) => category.name === writeup.category);
      writeup.thumbnail = `/assets/${category?.thumbnail ?? ""}`;
    }
    return writeup;
  }
  )
  

  return (
    <Posts data = {data} categories = {categories} topics = {topics} events = {events} type = {"writeup"}/>
  );
}