"use client";
import { useState, useEffect } from "react";
import { PostContainer } from "./PostContainer";
import { Sidebar } from "./Sidebar";
import { SideIndex } from "./SideIndex";
import "../Styles/body.scss";

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch("/api/posts");
        const posts = await response.json();

        // 카테고리별 포스트 수 계산
        const counts = posts.reduce(
          (acc: Record<string, number>, post: any) => {
            acc.all = (acc.all || 0) + 1;
            if (post.category) {
              acc[post.category] = (acc[post.category] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        setCategoryCounts(counts);
        setPosts(posts);
      } catch (error) {
        console.error("Failed to fetch category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleKeywordSelect = (keyword: string) => {
    setSearchTerm(keyword);
  };

  return (
    <div className="body">
      <Sidebar
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        categoryCounts={categoryCounts}
      />
      <PostContainer
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchResults={setSearchResults}
        posts={posts}
      />
      <SideIndex
        searchResults={searchResults}
        onKeywordSelect={handleKeywordSelect}
      />
    </div>
  );
};
