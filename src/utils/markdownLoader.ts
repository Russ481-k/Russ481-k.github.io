import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export async function getPost(id: string): Promise<Post> {
  const koContent = fs.readFileSync(
    path.join(process.cwd(), "posts", "ko", `${id}.md`),
    "utf-8"
  );
  const enContent = fs.readFileSync(
    path.join(process.cwd(), "posts", "en", `${id}.md`),
    "utf-8"
  );

  const koMatter = matter(koContent);
  const enMatter = matter(enContent);

  // 마크다운 컨텐츠를 HTML로 변환
  const koHtmlContent = await markdownToHtml(koMatter.content);
  const enHtmlContent = await markdownToHtml(enMatter.content);

  return {
    id,
    date: koMatter.data.date,
    category: koMatter.data.category,
    tags: koMatter.data.tags,
    thumbnail: koMatter.data.thumbnail,
    title: koMatter.data.title,
    content: koHtmlContent, // HTML로 변환된 컨텐츠 사용
    translations: {
      ko: {
        title: koMatter.data.title,
        description: koMatter.data.description,
        content: koHtmlContent, // HTML로 변환된 컨텐츠 사용
        tocItems: [], // TOC 생성 로직 필요
      },
      en: {
        title: enMatter.data.title,
        description: enMatter.data.description,
        content: enHtmlContent, // HTML로 변환된 컨텐츠 사용
        tocItems: [], // TOC 생성 로직 필요
      },
    },
    imageHeights: koMatter.data.imageHeights || {},
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(path.join(process.cwd(), "posts", "ko"));
  const posts = await Promise.all(
    files.map(async (filename) => {
      const id = filename.replace(/\.md$/, "");
      return await getPost(id);
    })
  );
  return posts;
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown 지원 추가
    .use(html, {
      sanitize: false, // HTML 태그 허용
    })
    .process(markdown);
  return result.toString();
}
