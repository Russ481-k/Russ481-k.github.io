"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PostModal } from "./PostModal";
import { getPostImage } from "@/utils/getPostImage";
import { FaGithub } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import "../Styles/header.scss";

export const Header = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const introPost = {
    id: "intro",
    title: "Introduction",
    content: `<h2>안녕하세요! 프론트엔드 개발자입니다.</h2>
              <p>새로운 기술을 배우고 적용하는 것을 좋아하며, 사용자 경험을 개선하는데 관심이 많습니다.</p>
              <h3>기술 스택</h3>
              <ul>
                <li>React, Next.js, TypeScript</li>
                <li>HTML5, CSS3, JavaScript</li>
                <li>Git, GitHub</li>
              </ul>`,
    plainContent: "",
    date: new Date().toISOString(),
    description: "개발자 소개",
    category: "about",
    tags: ["Frontend", "React", "Next.js"],
    searchTerm: "",
    thumbnail: "/images/profile.jpg",
  };

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
          <Link href="/">Bin's Space</Link>
        </h1>
        {!isExpanded && (
          <nav className="nav">
            <button onClick={() => setIsIntroOpen(true)}>Intro</button>
            <button onClick={() => setIsExperienceOpen(true)}>Work</button>
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
      <PostModal
        post={introPost}
        isOpen={isIntroOpen}
        onClose={() => setIsIntroOpen(false)}
      />
      <PostModal
        post={experiencePost}
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
      />
    </header>
  );
};
