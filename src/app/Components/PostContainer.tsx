"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Post as PostType } from "@/types/post";
import Post from "@/app/Components/Post";
import { useDebounce } from "@/hooks/useDebounce";
import "../Styles/post_container.scss";
import { categories } from "@/data/categories";

interface PostContainerProps {
  selectedCategory: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchResults: (results: string[]) => void;
  posts: PostType[]; // 또는 더 구체적인 타입 (예: Post[])
}

const categoryOrder = [
  "about",
  "career",
  "projects",
  "architecture",
  "database",
  "backend",
  "frontend",
];

export const PostContainer = ({
  selectedCategory,
  searchTerm: externalSearchTerm,
  onSearchChange,
  onSearchResults,
  posts: externalPosts, // 외부에서 받은 posts 사용
}: PostContainerProps) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  // searchTerm state를 제거하고 props로 받은 값 사용
  const debouncedSearchTerm = useDebounce(externalSearchTerm, 300);

  // 필터링 로직 메모이제이션
  const filteredPosts = useMemo(() => {
    // 먼저 카테고리로 필터링
    const categoryFiltered =
      selectedCategory === "all"
        ? externalPosts
        : externalPosts.filter((post) => post.category === selectedCategory);

    // 그 다음 검색어로 필터링
    const searchFiltered = categoryFiltered.filter(
      (post) =>
        post.plainContent
          ?.toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        post.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.description
          ?.toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
    );

    // 전체보기일 때만 카테고리 순서대로 정렬
    if (selectedCategory === "all") {
      return searchFiltered.sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        return aIndex - bIndex;
      });
    }

    return searchFiltered;
  }, [externalPosts, debouncedSearchTerm, selectedCategory]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  // 검색 결과 텍스트 추출
  useEffect(() => {
    // 필터링된 포스트가 없으면 모든 포스트의 키워드 사용
    const postsToUse =
      filteredPosts.length === 0 ? externalPosts : filteredPosts;

    const texts = postsToUse.map(
      (post) => `${post.title} ${post.plainContent} ${post.description}`
    );
    setSearchResults(texts);
    onSearchResults(texts);
  }, [filteredPosts, externalPosts, onSearchResults]);

  return (
    <div className="post_container">
      <div className="category_header">
        <div className="category_info">
          <h2>{currentCategory?.name || "전체 글"}</h2>
          <p>{currentCategory?.description}</p>
        </div>
        <div className="search_container">
          <input
            type="text"
            placeholder="Search"
            value={externalSearchTerm}
            onChange={handleSearchChange}
            className="search_input"
          />
        </div>
        <div className="post_count">총 {filteredPosts.length}개의 글</div>
      </div>
      {filteredPosts.map((post: PostType) => (
        <Post
          key={`${post.id}-${selectedCategory}`}
          {...post}
          searchTerm={debouncedSearchTerm}
          posts={filteredPosts}
        />
      ))}
    </div>
  );
};
