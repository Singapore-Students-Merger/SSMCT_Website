import getCategories from "@/utils/getCategories";
import getWriteups from "@/utils/getWriteups";
import getTopics from "@/utils/getTopics";
import getEvents from "@/utils/getEvents";
import Posts from "@/components/Posts";
export default async function WriteupsPageServer() {
  let data = await getWriteups();
  const categories = await getCategories();
  const topics = await getTopics();
  const events = await getEvents();
  data = data.map((writeup) => {
    if (!writeup.thumbnail) {
      const category = categories.find((category) => category.name === writeup.category);
      writeup.thumbnail = `/writeups/images/${category?.thumbnail ?? ""}`;
      console.log(writeup.thumbnail);
    }
    return writeup;
  }
  )
  

  return (
    <Posts data = {data} categories = {categories} topics = {topics} events = {events} type = {"writeup"}/>
  );
}