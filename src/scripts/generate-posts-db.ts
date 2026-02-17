import fs from "fs/promises";
import * as fsSync from "fs";
import path from "path";
import { Post, TocItem } from "@/types/post";
import { JSDOM } from "jsdom";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getPostsFromDB(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching posts from Supabase:", error.message);
    return [];
  }

  return data.map((dbPost: any) => ({
    id: dbPost.slug,
    title: dbPost.title_ko,
    content: dbPost.content_ko,
    date: dbPost.date,
    category: dbPost.category,
    tags: dbPost.tags || [],
    thumbnail: dbPost.thumbnail,
    translations: {
      ko: {
        title: dbPost.title_ko,
        description: "", // Can be extracted from content if needed
        content: dbPost.content_ko,
        tocItems: [],
      },
      en: {
        title: dbPost.title_en,
        description: "",
        content: dbPost.content_en,
        tocItems: [],
      },
    },
    imageHeights: {},
  }));
}

async function calculateActualHeights(content: string) {
  const dom = new JSDOM(content);
  const doc = dom.window.document;
  const elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6, img");
  const heights = new Map();

  elements.forEach((el, index) => {
    const type = el.tagName.toLowerCase();
    const id = type === "img" ? `img-${index}` : `heading-${index}`;
    const computedHeight = type === "img" ? 400 : 50;

    heights.set(id, {
      top: index * computedHeight,
      height: computedHeight,
      type,
    });
  });

  return heights;
}

async function processMarkdown(content: string) {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  const htmlContent = processedContent.toString();
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const tocItems: TocItem[] = [];

  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    tocItems.push({
      id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
      isMainTopic: parseInt(heading.tagName[1]) <= 2,
      position: 0,
    });
  });

  const actualHeights = await calculateActualHeights(doc.body.innerHTML);

  tocItems.forEach((item) => {
    const elementData = actualHeights.get(item.id);
    if (elementData?.top !== undefined) {
      item.position = elementData.top;
    }
  });

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

async function convertMarkdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return result.toString();
}

async function generatePosts() {
  const posts = await getPostsFromDB();
  const languages = ["ko", "en"];

  for (const post of posts) {
    for (const lang of languages) {
      const markdownContent = lang === "ko" ? post.translations.ko.content : post.translations.en.content;
      const htmlContent = await convertMarkdownToHtml(markdownContent);

      const outputDir = path.join(process.cwd(), "public", "posts", lang);
      if (!fsSync.existsSync(outputDir)) {
        fsSync.mkdirSync(outputDir, { recursive: true });
      }

      fsSync.writeFileSync(
        path.join(outputDir, `${post.id}.html`),
        htmlContent
      );
    }
  }
}

async function generatePostsJson() {
  const posts = await getPostsFromDB();
  const dataDir = path.join(process.cwd(), "public", "data");
  const postsDir = path.join(dataDir, "posts");

  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(postsDir, { recursive: true });

  const processedPosts = await Promise.all(
    posts.map(async (post) => {
      const koProcessed = await processMarkdown(post.translations.ko.content);
      const enProcessed = await processMarkdown(post.translations.en.content);

      const koContent = koProcessed.content.replace(/<table>/g, '<table class="markdown-table">');
      const enContent = enProcessed.content.replace(/<table>/g, '<table class="markdown-table">');

      return {
        ...post,
        translations: {
          ko: { ...post.translations.ko, content: koContent, tocItems: koProcessed.tocItems },
          en: { ...post.translations.en, content: enContent, tocItems: enProcessed.tocItems },
        },
        imageHeights: koProcessed.imageHeights,
      };
    })
  );

  await fs.writeFile(path.join(dataDir, "posts.json"), JSON.stringify(processedPosts, null, 2));

  await Promise.all(
    processedPosts.map((post) =>
      fs.writeFile(path.join(postsDir, `${post.id}.json`), JSON.stringify(post, null, 2))
    )
  );
}

const run = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not found. Skipping DB fetch.");
    return;
  }
  await generatePostsJson();
  await generatePosts();
};

run().catch(console.error);
