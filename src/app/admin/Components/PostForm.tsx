"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { CATEGORY_ORDER } from "@/constants/categoryOrder";

interface PostFormProps {
  initialData?: any;
  slug?: string;
}

export default function PostForm({ initialData, slug }: PostFormProps) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      title_ko: "",
      title_en: "",
      content_ko: "",
      content_en: "",
      category: CATEGORY_ORDER[0],
      tags: "",
      thumbnail: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const postData = {
      ...data,
      slug: slug || data.title_en.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, ""),
      tags: data.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean),
    };

    const { error } = await supabase.from("posts").upsert(postData, { onConflict: "slug" });

    if (error) {
      alert("Error saving post: " + error.message);
    } else {
      alert("Post saved successfully!");
      router.push("/admin");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="post-form">
      <div className="form-group">
        <label>Slug (URL Identifier)</label>
        <input {...register("slug")} disabled={!!slug} placeholder="e.g. my-post-title" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Title (KO)</label>
          <input {...register("title_ko")} required />
        </div>
        <div className="form-group">
          <label>Title (EN)</label>
          <input {...register("title_en")} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select {...register("category")}>
            {CATEGORY_ORDER.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" {...register("date")} />
        </div>
      </div>

      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input {...register("tags")} placeholder="tag1, tag2, tag3" />
      </div>

      <div className="form-group">
        <label>Thumbnail URL</label>
        <input {...register("thumbnail")} placeholder="https://example.com/image.png" />
      </div>

      <div className="tabs">
        <div className="tab-pane">
          <h3>Korean Content</h3>
          <textarea {...register("content_ko")} rows={15} required />
        </div>
        <div className="tab-pane">
          <h3>English Content</h3>
          <textarea {...register("content_en")} rows={15} required />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-save">
        {loading ? "Saving..." : "Save Post"}
      </button>

      <style jsx>{`
        .post-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-weight: bold;
          font-size: 0.9rem;
        }
        input, select, textarea {
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 1rem;
        }
        .tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .btn-save {
          background: #28a745;
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }
        .btn-save:disabled {
          background: #6c757d;
        }
      `}</style>
    </form>
  );
}
