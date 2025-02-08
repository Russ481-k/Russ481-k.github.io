import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdown";
import { Post } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Posts directory not found:", postsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        const content = await markdownToHtml(matterResult.content);

        const category =
          matterResult.data.category?.toLowerCase() || "uncategorized";

        return {
          id,
          title: matterResult.data.title,
          description: matterResult.data.description,
          content,
          plainContent: matterResult.content,
          category,
          date: matterResult.data.date,
          tags: matterResult.data.tags || [],
          thumbnail: matterResult.data.thumbnail,
        };
      })
  );

  return posts;
}

export async function getPostById(id: string) {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const content = await markdownToHtml(matterResult.content);

    return {
      id,
      title: matterResult.data.title,
      description: matterResult.data.description,
      content,
      plainContent: matterResult.content,
      date: matterResult.data.date,
      category: matterResult.data.category?.toLowerCase() || "uncategorized",
      tags: matterResult.data.tags || [],
      thumbnail: matterResult.data.thumbnail,
    } as Post;
  } catch {
    return null;
  }
}
