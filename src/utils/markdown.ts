import { marked } from "marked";
import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);

  return marked(result.toString(), {
    gfm: true,
    breaks: true,
  });
}
