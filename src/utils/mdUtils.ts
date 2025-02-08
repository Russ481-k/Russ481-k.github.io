import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "../types/post";

// 현재 posts 디렉토리 경로 확인
const postsDirectory = path.join(process.cwd(), "posts");

// 경로를 수정하려면 이 부분을 변경하면 됩니다.
// 예: const postsDirectory = path.join(process.cwd(), "src", "posts");

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      // 키워드 추출을 위한 원본 텍스트 저장
      const plainContent = matterResult.content;

      // 마크다운을 HTML로 변환
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      return {
        id,
        title: matterResult.data.title,
        content: contentHtml, // HTML로 변환된 컨텐츠
        plainContent: plainContent, // 검색을 위한 원본 텍스트
        category: matterResult.data.category,
        date: matterResult.data.date,
        description: matterResult.data.description,
        tags: matterResult.data.tags || [],
        thumbnail: matterResult.data.thumbnail || null,
      };
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category === category);
}
