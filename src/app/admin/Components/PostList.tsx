"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import styles from "./PostList.module.scss";

interface Post {
  slug: string;
  title_ko: string;
  date: string;
  category: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("slug, title_ko, date, category")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }

  if (loading) return <div className={styles.loading}>Loading posts...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>All Posts</h2>
        <Link href="/admin/posts/new" className={styles.createButton}>
          New Post
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug}>
              <td>{post.title_ko}</td>
              <td>
                <span className={styles.category}>{post.category}</span>
              </td>
              <td>{new Date(post.date).toLocaleDateString()}</td>
              <td>
                <Link href={`/admin/posts/${post.slug}`} className={styles.editLink}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No posts found. Create one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
