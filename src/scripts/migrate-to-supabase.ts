import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  const postsDirectory = path.join(process.cwd(), "posts/ko");
  const files = await fs.readdir(postsDirectory);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, "");
    const koPath = path.join(process.cwd(), "posts/ko", file);
    const enPath = path.join(process.cwd(), "posts/en", file);

    const koContent = await fs.readFile(koPath, "utf-8");
    const enContent = await fs.readFile(enPath, "utf-8");

    const koMatter = matter(koContent);
    const enMatter = matter(enContent);

    const postData = {
      slug,
      title_ko: koMatter.data.title,
      title_en: enMatter.data.title,
      content_ko: koMatter.content,
      content_en: enMatter.content,
      category: koMatter.data.category || "uncategorized",
      tags: koMatter.data.tags || [],
      thumbnail: koMatter.data.thumbnail || null,
      date: koMatter.data.date ? new Date(koMatter.data.date).toISOString() : new Date().toISOString(),
    };

    console.log(`Migrating ${slug}...`);
    const { error } = await supabase.from("posts").upsert(postData, { onConflict: "slug" });

    if (error) {
      console.error(`Error migrating ${slug}:`, error.message);
    } else {
      console.log(`Successfully migrated ${slug}`);
    }
  }
}

migrate().catch(console.error);
