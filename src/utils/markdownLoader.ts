import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, TocItem } from "@/types/post";

export async function getPost(id: string): Promise<Post> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const koPath = path.join(postsDirectory, "ko", `${id}.md`);
  const enPath = path.join(postsDirectory, "en", `${id}.md`);

  // Helper to read and parse a file
  const readFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return matter(fileContent);
    }
    return null;
  };

  const koMatter = readFile(koPath);
  const enMatter = readFile(enPath);

  // If neither exists, throw or return null (handling basic case where at least KO exists)
  if (!koMatter) {
    throw new Error(`Post not found: ${id}`);
  }

  // Use KO data as base, fallback to EN if specific fields missing (though structure implies specific per-lang files)
  const baseData = koMatter.data;

  return {
    id,
    date: baseData.date,
    category: baseData.category,
    tags: baseData.tags,
    thumbnail: baseData.thumbnail,
    title: baseData.title,
    content: koMatter.content, 
    translations: {
      ko: {
        title: baseData.title,
        description: baseData.description || "",
        content: koMatter.content,
        tocItems: [], // Client will parse this or we can parse here if needed. 
                      // Plan said to return raw markdown, client parses it.
      },
      en: {
        title: enMatter?.data.title || "",
        description: enMatter?.data.description || "",
        content: enMatter?.content || "",
        tocItems: [],
      },
    },
    imageHeights: baseData.imageHeights || {},
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const koDirectory = path.join(postsDirectory, "ko");
  
  if (!fs.existsSync(koDirectory)) {
    return [];
  }

  const files = fs.readdirSync(koDirectory);
  
  const posts = await Promise.all(
    files
      .filter(filename => filename.endsWith('.md'))
      .map(async (filename) => {
        const id = filename.replace(/\.md$/, "");
        return await getPost(id);
      })
  );
  
  // Sort by date desc
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}
