import fs from "fs/promises";
import * as fsSync from "fs";
import path from "path";
import { Post, TocItem } from "@/types/post";
import { marked } from "marked";
import { remark } from "remark";
import html from "remark-html";
import { JSDOM } from "jsdom";
import matter from "gray-matter";
import puppeteer from "puppeteer";

// getAllPosts 함수 추가
async function getAllPosts(): Promise<
  Omit<Post, "tocItems" | "imageHeights">[]
> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = await fs.readdir(postsDirectory);

  return Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          id,
          title: matterResult.data.title,
          content: matterResult.content,
          date: matterResult.data.date,
          category:
            matterResult.data.category?.toLowerCase() || "uncategorized",
          tags: matterResult.data.tags || [],
          description: matterResult.data.description,
          thumbnail: matterResult.data.thumbnail,
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

async function calculateActualHeights(
  content: string
): Promise<Map<string, { top: number; height: number; type: string }>> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${fsSync.readFileSync(
            path.join(process.cwd(), "src/app/Styles/post_modal.scss"),
            "utf8"
          )}
        </style>
      </head>
      <body>
        <div class="modal_content">
          <div class="content_wrapper">
            <article class="content">${content}</article>
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);

  // 모든 이미지가 로드될 때까지 대기
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    );
  });

  // 헤딩과 이미지의 위치 계산
  const heights = await page.evaluate(() => {
    const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, img");
    const result = new Map();

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const type = el.tagName.toLowerCase();
      const id = type === "img" ? `img-${index}` : `heading-${index}`;

      result.set(id, {
        top: rect.top,
        height: rect.height,
        type,
      });
    });

    return Object.fromEntries(result);
  });

  await browser.close();
  return new Map(Object.entries(heights));
}

async function processMarkdown(content: string): Promise<{
  content: string;
  tocItems: TocItem[];
  imageHeights: Record<string, number>;
}> {
  const result = await remark().use(html).process(content);
  const htmlContent = marked(result.toString(), {
    gfm: true,
    breaks: true,
    renderer,
  });

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
      const { content, tocItems, imageHeights } = await processMarkdown(
        post.content
      );
      return {
        ...post,
        content,
        tocItems,
        imageHeights,
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
