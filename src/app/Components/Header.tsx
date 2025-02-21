"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";

import "../Styles/header.scss";
import type { Post } from "@/types/post";
import { CONTACT } from "@/constants/contact";

const LoadingComponent = () => {
  const { t } = useTranslation();
  return <div>{t("modal.loading")}</div>;
};

// 모달 컴포넌트를 동적으로 import
const PostModal = dynamic(
  () => import("./PostModal").then((mod) => mod.default),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

export const Header = () => {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation();
  const currentLang = lng as "ko" | "en";
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [introPost, setIntroPost] = useState<Post | null>(null);

  const experiencePost: Post = {
    id: "experience",
    title: t("header.nav.work"),
    content: t("experience.content"),
    date: new Date().toISOString(),
    category: "about",
    tags: [],
    thumbnail: "/images/experience.jpg",
    translations: {
      ko: {
        title: t("header.nav.work"),
        description: t("header.nav.work"),
        content: `<h2>${t("experience.title")}</h2>
                  <h3>${t("experience.company")} (2022 - ${t(
          "common.experience.current"
        )})</h3>
                  <p>${t("profile.position")}</p>
                  <ul>
                    <li>${t("experience.skills.nextjs")}</li>
                    <li>${t("experience.skills.optimization")}</li>
                  </ul>
                  <h3>${t("experience.projectSection.title")}</h3>
                  <ul>
                    <li>${t("experience.projectSection.blog")}</li>
                    <li>${t("experience.projectSection.portfolio")}</li>
                  </ul>`,
        tocItems: [],
      },
      en: {
        title: "Work Experience",
        description: "Work Experience",
        content: `<h2>Experience</h2>
                  <h3>${t("experience.company")} (2022 - ${t(
          "common.experience.current"
        )})</h3>
                  <p>${t("profile.position")}</p>
                  <ul>
                    <li>${t("experience.skills.nextjs")}</li>
                    <li>${t("experience.skills.optimization")}</li>
                  </ul>
                  <h3>${t("experience.projectSection.title")}</h3>
                  <ul>
                    <li>${t("experience.projectSection.blog")}</li>
                    <li>${t("experience.projectSection.portfolio")}</li>
                  </ul>`,
        tocItems: [],
      },
    },
    imageHeights: {},
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

  // 헤더 메뉴 아이템 정의
  const menuItems = [
    {
      key: "intro",
      label: t("header.nav.intro"),
      onClick: () => setIsIntroOpen(true),
    },
    {
      key: "work",
      label: t("header.nav.work"),
      onClick: () => setIsExperienceOpen(true),
    },
    {
      key: "notion",
      label: t("header.nav.notion"),
      href: CONTACT.NOTION_URL,
      external: true,
    },
  ];

  return (
    <header className={`header ${isExpanded ? "expanded" : ""}`}>
      <div className="header_content">
        <div className="title_area">
          <h1 className="title">
            <Link href={`/${lng}`}>{t("header.title")}</Link>
          </h1>
          {!isExpanded && <LanguageSelector />}
        </div>
        {!isExpanded && (
          <nav className="nav">
            {menuItems.map((item) =>
              item.external ? (
                <Link
                  key={item.key}
                  href={item.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon_link"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.key}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    item.onClick?.();
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        )}
      </div>
      {introPost && isIntroOpen && (
        <Suspense fallback={<div>{t("modal.loading")}</div>}>
          <PostModal
            post={introPost}
            isOpen={isIntroOpen}
            onClose={() => setIsIntroOpen(false)}
            prevPost={null}
            nextPost={null}
            onPostChange={() => {}}
          />
        </Suspense>
      )}
      {isExperienceOpen && (
        <Suspense fallback={<div>{t("modal.loading")}</div>}>
          <PostModal
            post={experiencePost}
            isOpen={isExperienceOpen}
            onClose={() => setIsExperienceOpen(false)}
            prevPost={null}
            nextPost={null}
            onPostChange={() => {}}
          />
        </Suspense>
      )}
    </header>
  );
};
