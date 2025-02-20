"use client";

import { useEffect, useMemo, useCallback } from "react";
import { Category, Post as PostType } from "@/types/post";
import Post from "@/app/Components/Post";
import { useDebounce } from "@/hooks/useDebounce";
import "../Styles/post_container.scss";
import { useCategories } from "@/data/categories";
import { useTranslation } from "react-i18next";
import { CATEGORY_ORDER } from "@/constants/categoryOrder";
import { I18NProvider } from "next/dist/server/future/helpers/i18n-provider";

interface PostContainerProps {
  selectedCategory: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchResults: (results: string[]) => void;
  posts: PostType[]; // 또는 더 구체적인 타입 (예: Post[])
}

export const PostContainer = ({
  selectedCategory,
  searchTerm: externalSearchTerm,
  onSearchChange,
  onSearchResults,
  posts: externalPosts, // 외부에서 받은 posts 사용
}: PostContainerProps) => {
  const { t, i18n } = useTranslation();
  const categories = useCategories();
  const currentCategory = categories?.find(
    (cat: Category) => cat.id === selectedCategory
  );

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
    const searchFiltered = categoryFiltered.filter((post) => {
      const currentLang = i18n.language as "ko" | "en";
      const translation =
        post.translations?.[currentLang] || post.translations?.["en"];

      return (
        translation?.content
          .replace(/<[^>]*>/g, "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        translation?.title
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    });

    // 전체보기일 때만 카테고리 순서대로 정렬
    if (selectedCategory === "all") {
      return searchFiltered
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .sort((a, b) => {
          const aIndex = CATEGORY_ORDER.indexOf(a.category);
          const bIndex = CATEGORY_ORDER.indexOf(b.category);
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

    const currentLang = i18n.language as "ko" | "en";
    const texts = postsToUse.map((post) => {
      const translation =
        post.translations?.[currentLang] || post.translations?.["en"];
      return `${translation?.title} ${translation?.content} ${translation?.description}`;
    });
    onSearchResults(texts);
  }, [filteredPosts, externalPosts, onSearchResults]);

  return (
    <div className="post_container">
      <div className="category_header">
        <div className="category_info">
          <h2>{currentCategory?.name || t("categories.all")}</h2>
          <p>{currentCategory?.description}</p>
        </div>
        <div className="search_container">
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={externalSearchTerm}
            onChange={handleSearchChange}
            className="search_input"
          />
        </div>
        <div className="post_count">
          {t("search.totalPosts", { count: filteredPosts.length })}
        </div>
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
