"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import styles from "./PostEditor.module.scss";
import LexicalEditor from "../../Components/Lexical/Editor";
import { extractHeadings } from "@/utils/markdownUtils";

// Simple markdown editor using textarea for now (can upgrade to a rich editor later)
// We split content into Korean (ko) and English (en) tabs ideally, 
// but for MVP let's focus on the structure.

interface PostEditorProps {
  initialData?: any;
  isNew?: boolean;
}

export default function PostEditor({ initialData, isNew = false }: PostEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"ko" | "en">("ko");
  
  const [formData, setFormData] = useState({
    slug: "",
    category: "uncategorized",
    tags: "",
    thumbnail: "",
    date: new Date().toISOString().split("T")[0],
    title_ko: "",
    content_ko: "",
    title_en: "",
    content_en: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        slug: initialData.slug || "",
        category: initialData.category || "uncategorized",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
        thumbnail: initialData.thumbnail || "",
        date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        title_ko: initialData.title_ko || "",
        content_ko: initialData.content_ko || "",
        title_en: initialData.title_en || "",
        content_en: initialData.content_en || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateSlug = () => {
    // Simple slug generator from title_ko if slug is empty
    if (!formData.slug && formData.title_ko) {
      const slug = formData.title_ko
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, "")
        .trim()
        .replace(/[\s]+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const tocItemsKo = extractHeadings(formData.content_ko);
      const tocItemsEn = extractHeadings(formData.content_en);

      const postData = {
        slug: formData.slug,
        category: formData.category,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        thumbnail: formData.thumbnail,
        date: new Date(formData.date).toISOString(),
        title_ko: formData.title_ko,
        title_en: formData.title_en,
        translations: {
            ko: {
                title: formData.title_ko,
                description: "", // Add description field if needed
                content: formData.content_ko,
                tocItems: tocItemsKo
            },
            en: {
                title: formData.title_en,
                description: "",
                content: formData.content_en,
                tocItems: tocItemsEn
            }
        }
      };

      // Note: The Supabase table 'posts' must have a 'translations' JSONB column 
      // and NOT separate title_ko/content_ko columns if we are using this structure.
      // However, the current component state uses title_ko/content_ko flat fields.
      // AND the fetch in PostList selects 'slug, title_ko'.
      // So we must keep flat fields AND update translations jsonb if that's the source of truth for the frontend modal.
      
      const flatData = {
        slug: formData.slug,
        category: formData.category,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        thumbnail: formData.thumbnail,
        date: new Date(formData.date).toISOString(),
        title_ko: formData.title_ko,
        content_ko: formData.content_ko,
        title_en: formData.title_en,
        content_en: formData.content_en,
        translations: {
            ko: {
                title: formData.title_ko,
                description: "",
                content: formData.content_ko,
                tocItems: tocItemsKo
            },
            en: {
                title: formData.title_en,
                description: "",
                content: formData.content_en,
                tocItems: tocItemsEn
            }
        }
      };

      const { error } = await supabase
        .from("posts")
        .upsert(flatData, { onConflict: "slug" });

      if (error) throw error;

      alert("Post saved successfully!");
      router.push("/admin/posts");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving post:", error);
      alert(`Error saving post: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.toolbar}>
        <h1>{isNew ? "Create New Post" : "Edit Post"}</h1>
        <div className={styles.actions}>
          <button type="button" className={styles.btnSecondary} onClick={() => router.back()}>
            Cancel
          </button>
          <button type="submit" className={styles.btnPrimary} disabled={saving}>
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          <div className={styles.card}>
            <div className={styles.tabs}>
              <button
                type="button"
                className={`${styles.tab} ${activeTab === "ko" ? styles.active : ""}`}
                onClick={() => setActiveTab("ko")}
              >
                Korean (KO)
              </button>
              <button
                type="button"
                className={`${styles.tab} ${activeTab === "en" ? styles.active : ""}`}
                onClick={() => setActiveTab("en")}
              >
                English (EN)
              </button>
            </div>

            <div className={styles.contentArea}>
              {activeTab === "ko" ? (
                <>
                  <div className={styles.field}>
                    <label>Title (KO)</label>
                    <input
                      type="text"
                      name="title_ko"
                      value={formData.title_ko}
                      onChange={handleChange}
                      onBlur={isNew ? generateSlug : undefined}
                      required
                      placeholder="Post Title in Korean"
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Content (KO) - MarkDown</label>
                    <div className={styles.editorWrapper}>
                      <LexicalEditor
                        initialMarkdown={formData.content_ko}
                        onChange={(markdown) =>
                          setFormData((prev) => ({ ...prev, content_ko: markdown }))
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.field}>
                    <label>Title (EN)</label>
                    <input
                      type="text"
                      name="title_en"
                      value={formData.title_en}
                      onChange={handleChange}
                      placeholder="Post Title in English"
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Content (EN) - MarkDown</label>
                    <div className={styles.editorWrapper}>
                      <LexicalEditor
                        initialMarkdown={formData.content_en}
                        onChange={(markdown) =>
                          setFormData((prev) => ({ ...prev, content_en: markdown }))
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.sideColumn}>
          <div className={styles.card}>
            <h3>Settings</h3>
            <div className={styles.field}>
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                disabled={!isNew} // Prevent changing slug for existing posts to avoid broken links
              />
            </div>
            <div className={styles.field}>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="uncategorized">Uncategorized</option>
                <option value="dev">Dev</option>
                <option value="life">Life</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, nextjs, tutorial"
              />
            </div>
            <div className={styles.field}>
              <label>Thumbnail URL</label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="/images/example.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
