import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";

export async function processMarkdown(markdownContent: string) {
  const processedContent = await remark()
    .use(remarkRehype) // Convert markdown to HTML-compatible AST
    .use(rehypePrism, { showLineNumbers: true }) // Add syntax highlighting and line numbers
    .use(rehypeStringify) // Convert HTML AST to string
    .process(markdownContent);

  return processedContent.toString();
}
