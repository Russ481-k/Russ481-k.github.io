"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";

import "../Styles/header.scss";
import type { Post } from "@/types/post";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { createDefaultExperiencePost, createMenuItems } from "@/constants/headerData";

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
  const { isExpanded, isInitial } = useHeaderScroll();
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [experiencePost, setExperiencePost] = useState<Post>(() =>
    createDefaultExperiencePost(t)
  );

  const [introPost, setIntroPost] = useState<Post | null>(null);

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
    const fetchExperiencePost = async () => {
      const response = await fetch("/api/post/career");
      if (response.ok) {
        const post = await response.json();
        setExperiencePost(post);
      }
    };
    fetchExperiencePost();
  }, []);

  const menuItems = createMenuItems(t, {
    onIntroClick: () => setIsIntroOpen(true),
    onWorkClick: () => setIsExperienceOpen(true),
  });

  return (
    <header className={`header ${isExpanded ? "expanded" : ""}`}>
      <div className="header_content">
        <div className="title_area">
          <h1 className="title">{t("header.title")}</h1>
          <LanguageSelector disabled={isExpanded} />
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
