import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

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

  return {
    id,
    date: koMatter.data.date,
    category: koMatter.data.category,
    tags: koMatter.data.tags,
    thumbnail: koMatter.data.thumbnail,
    translations: {
      ko: {
        title: koMatter.data.title,
        description: koMatter.data.description,
        content: koMatter.content,
        tocItems: [], // TOC 생성 로직 필요
      },
      en: {
        title: enMatter.data.title,
        description: enMatter.data.description,
        content: enMatter.content,
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
