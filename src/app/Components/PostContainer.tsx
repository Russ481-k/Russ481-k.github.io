"use client";

import { useEffect, useMemo, useCallback, useState } from "react";
import { Category, Post as PostType } from "@/types/post";
import Post from "@/app/Components/Post";
import { useDebounce } from "@/hooks/useDebounce";
import "../Styles/post_container.scss";
import { useCategories } from "@/data/categories";
import { useTranslation } from "react-i18next";
import { getPostTranslation } from "@/utils/postFormatting";
import { CATEGORY_ORDER } from "@/constants/categoryOrder";

import { FaSearch } from "react-icons/fa";

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

  const [localSearchTerm, setLocalSearchTerm] = useState(externalSearchTerm);

  // Sync local state when external value changes
  useEffect(() => {
    setLocalSearchTerm(externalSearchTerm);
  }, [externalSearchTerm]);

  // searchTerm state를 제거하고 props로 받은 값 사용
  const debouncedSearchTerm = useDebounce(externalSearchTerm, 300);

  // Pre-compute stripped text per post to avoid re-running regex on every filter
  const postsWithStrippedText = useMemo(() => {
    const currentLang = i18n.language as "ko" | "en";
    return externalPosts.map((post) => {
      const translation = getPostTranslation(post, currentLang);
      return {
        post,
        strippedContent: (translation?.content || "").replace(/<[^>]*>/g, "").toLowerCase(),
        titleLower: (translation?.title || "").toLowerCase(),
        searchText: `${translation?.title} ${translation?.content} ${translation?.description}`,
      };
    });
  }, [externalPosts, i18n.language]);

  // 필터링 로직 메모이제이션 + search results consolidated
  const { filteredPosts, searchResultTexts } = useMemo(() => {
    const searchLower = debouncedSearchTerm.toLowerCase();

    // 먼저 카테고리로 필터링
    const categoryFiltered =
      selectedCategory === "all"
        ? postsWithStrippedText
        : postsWithStrippedText.filter((p) => p.post.category === selectedCategory);

    // 그 다음 검색어로 필터링
    const searchFiltered = categoryFiltered.filter((p) => {
      return (
        p.strippedContent.includes(searchLower) ||
        p.titleLower.includes(searchLower)
      );
    });

    // 전체보기일 때만 카테고리 순서대로 정렬
    let sorted = searchFiltered.map((p) => p.post);
    if (selectedCategory === "all") {
      sorted = sorted
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .sort((a, b) => {
          const aIndex = CATEGORY_ORDER.indexOf(a.category);
          const bIndex = CATEGORY_ORDER.indexOf(b.category);
          return aIndex - bIndex;
        });
    }

    // 검색 결과 텍스트 추출 (consolidated - no separate useEffect)
    const textsSource = searchFiltered.length === 0 ? postsWithStrippedText : searchFiltered;
    const texts = textsSource.map((p) => p.searchText);

    return { filteredPosts: sorted, searchResultTexts: texts };
  }, [postsWithStrippedText, debouncedSearchTerm, selectedCategory]);

  // Notify parent of search results
  useEffect(() => {
    onSearchResults(searchResultTexts);
  }, [searchResultTexts, onSearchResults]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearchChange(localSearchTerm);
    },
    [onSearchChange, localSearchTerm]
  );

  return (
    <div className="post_container">
      <div className="category_header">
        <div className="category_info">
          <h2>{currentCategory?.name || t("categories.all")}</h2>
          <p className="category_description">{currentCategory?.description}</p>
        </div>
        <form className="search_container" onSubmit={handleSubmit}>
          <div className="search_input_wrapper">
            <input
              type="text"
              placeholder={t("search.placeholder")}
              className="search_input"
              value={localSearchTerm}
              onChange={(e) => {
                setLocalSearchTerm(e.target.value);
                onSearchChange(e.target.value);
              }}
            />
            <button type="submit" className="search_button">
              {/* @ts-ignore */}
              <FaSearch />
            </button>
          </div>
        </form>
        <div className="post_count">
          {t("search.totalPosts", { count: filteredPosts.length })}
        </div>
        <div className="post_count_mobile">{filteredPosts.length}</div>
      </div>
      {filteredPosts.map((post: PostType) => (
        <Post
          key={`${post.id}-${selectedCategory}`}
          {...post}
          searchTerm={debouncedSearchTerm}
          posts={filteredPosts}
          onTagClick={(tag) => {
            onSearchChange(tag); // Update parent state
            setLocalSearchTerm(tag);
          }}
        />
      ))}
    </div>
  );
};
