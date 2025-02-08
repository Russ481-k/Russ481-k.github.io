import { remark } from "remark";
import remarkHtml from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkHtml) // 임시로 any 타입 사용
    .process(markdown);
  return result.toString();
}
