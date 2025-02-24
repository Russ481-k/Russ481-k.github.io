// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { Post } from "@/types/post";
// import { remark } from "remark";
// import remarkHtml from "remark-html";
// import remarkGfm from "remark-gfm";
// import { unified } from "unified";
// import remarkParse from "remark-parse";

// export async function getPost(id: string): Promise<Post> {
//   const koContent = fs.readFileSync(
//     path.join(process.cwd(), "posts", "ko", `${id}.md`),
//     "utf-8"
//   );
//   const enContent = fs.readFileSync(
//     path.join(process.cwd(), "posts", "en", `${id}.md`),
//     "utf-8"
//   );

//   const koMatter = matter(koContent);
//   const enMatter = matter(enContent);

//   // 변환 전 마크다운 컨텐츠 확인
//   console.log("Korean Markdown Content:", koMatter.content);

//   // 마크다운 컨텐츠를 HTML로 변환
//   const koHtmlContent = await markdownToHtml(koMatter.content);
//   const enHtmlContent = await markdownToHtml(enMatter.content);

//   // 변환 후 HTML 컨텐츠 확인
//   console.log("Korean HTML Content:", koHtmlContent);

//   return {
//     id,
//     date: koMatter.data.date,
//     category: koMatter.data.category,
//     tags: koMatter.data.tags,
//     thumbnail: koMatter.data.thumbnail,
//     title: koMatter.data.title,
//     content: koHtmlContent, // HTML로 변환된 컨텐츠 사용
//     translations: {
//       ko: {
//         title: koMatter.data.title,
//         description: koMatter.data.description,
//         content: koHtmlContent, // HTML로 변환된 컨텐츠 사용
//         tocItems: [], // TOC 생성 로직 필요
//       },
//       en: {
//         title: enMatter.data.title,
//         description: enMatter.data.description,
//         content: enHtmlContent, // HTML로 변환된 컨텐츠 사용
//         tocItems: [], // TOC 생성 로직 필요
//       },
//     },
//     imageHeights: koMatter.data.imageHeights || {},
//   };
// }

// export async function getAllPosts(): Promise<Post[]> {
//   const files = fs.readdirSync(path.join(process.cwd(), "posts", "ko"));
//   const posts = await Promise.all(
//     files.map(async (filename) => {
//       const id = filename.replace(/\.md$/, "");
//       return await getPost(id);
//     })
//   );
//   return posts;
// }

// export async function markdownToHtml(markdown: string) {
//   console.log("\n=== Markdown Conversion Process ===");
//   console.log("\n1. Input Markdown:", markdown);

//   // Parse 단계
//   const parsed = await unified().use(remarkParse).parse(markdown);
//   console.log("\n2. After remarkParse:", parsed);

//   // GFM 처리 단계
//   const gfmProcessed = await unified()
//     .use(remarkParse)
//     .use(remarkGfm)
//     .runSync(parsed);
//   console.log("\n3. After remarkGfm:", gfmProcessed);

//   // HTML 변환 단계
//   const result = await unified()
//     .use(remarkParse)
//     .use(remarkGfm)
//     .use(remarkHtml, {
//       sanitize: false,
//     })
//     .process(markdown);

//   const htmlResult = result.toString();
//   console.log("\n4. Final HTML Output:", htmlResult);
//   console.log("\n===============================\n");

//   return htmlResult;
// }
