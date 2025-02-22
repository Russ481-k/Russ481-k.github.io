"use client";
import { useState, useEffect } from "react";
import { PostContainer } from "./PostContainer";
import { Sidebar } from "./Sidebar";
import { SideIndex } from "./SideIndex";
import "../Styles/body.scss";
import { Post } from "@/types/post";
import { MobileHeader } from "./MobileHeader";
import { useCategories } from "@/data/categories";
import { getClientPosts } from "@/utils/clientPosts";

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = useCategories();
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // API 호출 대신 정적 JSON 파일을 불러옴
        const posts = await getClientPosts();
        setPosts(posts);

        // 카테고리 카운트 계산 수정
        const counts = posts.reduce(
          (acc: Record<string, number>, post: Post) => {
            // 전체 포스트 수 카운트
            acc.all = (acc.all || 0) + 1;

            // 각 카테고리별 카운트
            const category = post.category || "uncategorized";
            acc[category] = (acc[category] || 0) + 1;

            return acc;
          },
          {} as Record<string, number>
        );

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleKeywordSelect = (keyword: string) => {
    setSearchTerm(keyword);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="body">
      <MobileHeader
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategorySelect}
        categoryCounts={categoryCounts}
      />
      <Sidebar
        categories={categories}
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
