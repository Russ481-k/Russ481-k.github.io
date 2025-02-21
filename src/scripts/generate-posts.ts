import fs from "fs/promises";
import * as fsSync from "fs";
import path from "path";
import { Post, TocItem } from "@/types/post";
import { marked } from "marked";
import { remark } from "remark";
import html from "remark-html";
import { JSDOM } from "jsdom";
import matter from "gray-matter";

// getAllPosts 함수 추가
async function getAllPosts(): Promise<
  Omit<Post, "tocItems" | "imageHeights">[]
> {
  const postsDirectory = path.join(process.cwd(), "posts/ko");
  const fileNames = await fs.readdir(postsDirectory);

  return Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const koContent = await fs.readFile(
          path.join(postsDirectory, fileName),
          "utf8"
        );
        const enContent = await fs.readFile(
          path.join(process.cwd(), "posts/en", fileName),
          "utf8"
        );

        const koMatter = matter(koContent);
        const enMatter = matter(enContent);

        return {
          id,
          title: koMatter.data.title,
          content: koMatter.content,
          date: koMatter.data.date,
          category: koMatter.data.category?.toLowerCase() || "uncategorized",
          tags: koMatter.data.tags || [],
          thumbnail: koMatter.data.thumbnail,
          translations: {
            ko: {
              title: koMatter.data.title,
              description: koMatter.data.description,
              content: koContent,
              tocItems: [],
            },
            en: {
              title: enMatter.data.title,
              description: enMatter.data.description,
              content: enContent,
              tocItems: [],
            },
          },
        };
      })
  );
}

// marked 렌더러 커스터마이징
const renderer = new marked.Renderer();
renderer.paragraph = (text) => {
  // 이미지 태그가 있는지 확인
  if (text.includes("<img")) {
    // p 태그를 div.post_image_container로 대체
    return text.replace(
      /<p>(<img[^>]+>)<\/p>/g,
      '<div class="post_image_container">$1</div>'
    );
  }
  return `<p>${text}</p>`;
};

renderer.image = (href, title, text) => {
  return `<img 
    src="${href}" 
    alt="${text || ""}" 
    title="${title || text || ""}"
    loading="lazy"
  />`;
};

async function calculateActualHeights(content: string) {
  const dom = new JSDOM(content);
  const doc = dom.window.document;

  const elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6, img");
  const heights = new Map();

  elements.forEach((el, index) => {
    const type = el.tagName.toLowerCase();
    const id = type === "img" ? `img-${index}` : `heading-${index}`;

    // 기본 높이 계산
    const computedHeight = type === "img" ? 400 : 50; // 예상 높이

    heights.set(id, {
      top: index * computedHeight, // 예상 위치
      height: computedHeight,
      type,
    });
  });

  return heights;
}

async function processMarkdown(content: string) {
  // 메타데이터와 실제 콘텐츠 분리
  const { content: markdownContent } = matter(content);

  // HTML로 변환 (메타데이터 제외)
  const processedContent = await remark().use(html).process(markdownContent);

  const htmlContent = processedContent.toString();
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const tocItems: TocItem[] = [];

  // 각 헤딩에 ID 부여
  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    tocItems.push({
      id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
      isMainTopic: parseInt(heading.tagName[1]) <= 2,
      position: 0, // 실제 위치는 calculateActualHeights에서 계산
    });
  });

  const actualHeights = await calculateActualHeights(doc.body.innerHTML);

  // tocItems에 실제 높이 적용
  tocItems.forEach((item) => {
    const elementData = actualHeights.get(item.id);
    if (elementData?.top !== undefined) {
      item.position = elementData.top;
    }
  });

  // 이미지 높이 정보 추가
  const imageHeights = new Map();
  actualHeights.forEach((data, id) => {
    if (data.type === "img") {
      imageHeights.set(id, data.height);
    }
  });

  return {
    content: doc.body.innerHTML,
    tocItems,
    imageHeights: Object.fromEntries(imageHeights),
  };
}

async function generatePostsJson() {
  const posts = await getAllPosts();
  const dataDir = path.join(process.cwd(), "public", "data");
  const postsDir = path.join(dataDir, "posts");

  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(postsDir, { recursive: true });

  // 각 포스트 처리
  const processedPosts = await Promise.all(
    posts.map(async (post) => {
      // ko와 en 각각의 content에 대해 processMarkdown 실행
      const koProcessed = await processMarkdown(post.translations.ko.content);
      const enProcessed = await processMarkdown(post.translations.en.content);

      return {
        ...post,
        translations: {
          ko: {
            ...post.translations.ko,
            content: koProcessed.content,
            tocItems: koProcessed.tocItems,
          },
          en: {
            ...post.translations.en,
            content: enProcessed.content,
            tocItems: enProcessed.tocItems,
          },
        },
        imageHeights: koProcessed.imageHeights, // 한글 버전의 이미지 높이 사용
      };
    })
  );

  // 저장
  await fs.writeFile(
    path.join(dataDir, "posts.json"),
    JSON.stringify(processedPosts, null, 2)
  );

  await Promise.all(
    processedPosts.map((post) =>
      fs.writeFile(
        path.join(postsDir, `${post.id}.json`),
        JSON.stringify(post, null, 2)
      )
    )
  );
}

generatePostsJson().catch(console.error);
