"use client";

import React from "react";
import PostList from "../Components/PostList";

export default function AdminPostsPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "2rem", color: "#343a40" }}>Manage Posts</h1>
      <PostList />
    </div>
  );
}
