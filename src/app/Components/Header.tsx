"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import "../Styles/header.scss";
import type { Post } from "@/types/post";

// 모달 컴포넌트를 동적으로 import
const PostModal = dynamic(
  () => import("./PostModal").then((mod) => mod.default),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

export const Header = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [introPost, setIntroPost] = useState<Post | null>(null);

  const experiencePost = {
    id: "experience",
    title: "Experience",
    content: `<h2>경력 사항</h2>
              <h3>회사명 (2022 - 현재)</h3>
              <p>프론트엔드 개발자</p>
              <ul>
                <li>Next.js를 사용한 웹 애플리케이션 개발</li>
                <li>성능 최적화 및 사용자 경험 개선</li>
              </ul>
              <h3>프로젝트</h3>
              <ul>
                <li>개인 블로그 개발</li>
                <li>포트폴리오 웹사이트 제작</li>
              </ul>`,
    plainContent: "",
    date: new Date().toISOString(),
    description: "경력 사항",
    category: "career",
    tags: ["Career", "Project"],
    searchTerm: "",
    thumbnail: "/images/experience.jpg",
  };

  useEffect(() => {
    const fetchIntroPost = async () => {
      const response = await fetch("/api/post/about-me");
      if (response.ok) {
        const post = await response.json();
        setIntroPost(post);
      }
    };
    fetchIntroPost();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsExpanded(false);
        setIsInitial(false);
      } else if (window.scrollY === 0 && isInitial) {
        setIsExpanded(true);
      }
    };

    const handleClick = () => {
      if (isInitial) {
        setIsExpanded(false);
        setIsInitial(false);
        window.scrollTo({
          top: 1,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, [isInitial]);

  return (
    <header className={`header ${isExpanded ? "expanded" : ""}`}>
      <div className="header_content">
        <h1 className="title">
          <Link href="/">Bin&apos;s Space</Link>
        </h1>
        {!isExpanded && (
          <nav className="nav">
            <Link href="#" onClick={() => setIsIntroOpen(true)}>
              Intro
            </Link>
            <Link href="#" onClick={() => setIsExperienceOpen(true)}>
              Work
            </Link>
            <Link
              href="https://binsspace.notion.site/Bin-s-Space-1ebe0875dc7442cc91f7e1defc3802ab"
              target="_blank"
              rel="noopener noreferrer"
              className="icon_link"
              aria-label="Notion Page"
            >
              Notion
            </Link>
          </nav>
        )}
      </div>
      {introPost && isIntroOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <PostModal
            post={introPost}
            isOpen={isIntroOpen}
            onClose={() => setIsIntroOpen(false)}
          />
        </Suspense>
      )}
      {isExperienceOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <PostModal
            post={experiencePost}
            isOpen={isExperienceOpen}
            onClose={() => setIsExperienceOpen(false)}
          />
        </Suspense>
      )}
    </header>
  );
};
