import { getCategories } from "@/app/api/categories/route";
import WriteupsPage from "./WriteupsPage";
import { getWriteups } from "@/app/api/writeups/route";
import { getTopics } from "@/app/api/topics/route";
export default async function WriteupsPageServer() {
  let data = await getWriteups();
  const categories = await getCategories();
  const topics = await getTopics();
  data = data.map((writeup) => {
    if (!writeup.thumbnail) {
      const category = categories.find((category) => category.name === writeup.category);
      writeup.thumbnail = `/assets/${category?.thumbnail ?? ""}`;
    }
    return writeup;
  }
  )
  

  return (
    <WriteupsPage data = {data} categories = {categories} topics = {topics}/>
  );
}