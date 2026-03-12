import fs from "fs/promises";
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

// Create the unified/remark pipeline once and reuse across all posts
const markdownPipeline = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkHtml, { sanitize: false });

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

async function processMarkdown(content: string) {
  const processedContent = await markdownPipeline.process(content);

  const htmlContent = processedContent.toString();
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  // Extract headings and compute heights in a single DOM pass (no second JSDOM)
  const elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6, img");
  const tocItems: TocItem[] = [];
  const imageHeights: Record<string, number> = {};
  let headingIndex = 0;

  elements.forEach((el, index) => {
    const type = el.tagName.toLowerCase();
    const computedHeight = type === "img" ? 400 : 50;
    const top = index * computedHeight;

    if (type === "img") {
      const imgId = `img-${index}`;
      imageHeights[imgId] = computedHeight;
    } else {
      const id = `heading-${headingIndex}`;
      el.id = id;
      headingIndex++;
      tocItems.push({
        id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
        isMainTopic: parseInt(el.tagName[1]) <= 2,
        position: top,
      });
    }
  });

  return {
    content: doc.body.innerHTML,
    tocItems,
    imageHeights,
  };
}

async function generateAllPosts() {
  const posts = await getPostsFromDB();

  const dataDir = path.join(process.cwd(), "public", "data");
  const postsDir = path.join(dataDir, "posts");
  const htmlKoDir = path.join(process.cwd(), "public", "posts", "ko");
  const htmlEnDir = path.join(process.cwd(), "public", "posts", "en");

  // Ensure all output directories exist
  await Promise.all([
    fs.mkdir(dataDir, { recursive: true }),
    fs.mkdir(postsDir, { recursive: true }),
    fs.mkdir(htmlKoDir, { recursive: true }),
    fs.mkdir(htmlEnDir, { recursive: true }),
  ]);

  // Process each post once, reuse HTML for both JSON and HTML file output
  const processedPosts = await Promise.all(
    posts.map(async (post) => {
      const koProcessed = await processMarkdown(post.translations.ko.content);
      const enProcessed = await processMarkdown(post.translations.en.content);

      const koContent = koProcessed.content.replace(/<table>/g, '<table class="markdown-table">');
      const enContent = enProcessed.content.replace(/<table>/g, '<table class="markdown-table">');

      // Write HTML files using the already-converted content
      await Promise.all([
        fs.writeFile(path.join(htmlKoDir, `${post.id}.html`), koContent),
        fs.writeFile(path.join(htmlEnDir, `${post.id}.html`), enContent),
      ]);

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

  // Write JSON files
  await Promise.all([
    fs.writeFile(path.join(dataDir, "posts.json"), JSON.stringify(processedPosts, null, 2)),
    ...processedPosts.map((post) =>
      fs.writeFile(path.join(postsDir, `${post.id}.json`), JSON.stringify(post, null, 2))
    ),
  ]);
}

const run = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not found. Skipping DB fetch.");
    return;
  }
  await generateAllPosts();
};

run().catch(console.error);
