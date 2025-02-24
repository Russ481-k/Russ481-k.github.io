"use client";
import { Post, TocItem } from "@/types/post";
import { Tag } from "./Tag";
import { useEffect, useRef, useState, useCallback } from "react";
import "../Styles/post_modal.scss";
import Image from "next/image";
import { getPostImage } from "@/utils/getPostImage";
import { ModalPortal } from "./ModalPortal";
import React from "react";
import { getClientPost } from "@/utils/clientPosts";
import { FiCopy } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  prevPost?: Post | null; // 이전 포스트
  nextPost?: Post | null; // 다음 포스트
  onPostChange: (post: Post) => void; // 포스트 변경 핸들러
}

const PostModal = ({
  post,
  isOpen,
  onClose,
  prevPost,
  nextPost,
  onPostChange,
}: PostModalProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "ko" | "en";

  const translation =
    post.translations?.[currentLang] || post.translations?.["en"];
  const { title, content, tocItems } = translation;

  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const scrollToHeading = useCallback(
    (id: string) => {
      const heading = tocItems?.find((h: TocItem) => h.id === id);
      if (!heading || !contentRef.current) return;

      const headingElement = contentRef.current.querySelector(`#${id}`);
      if (!headingElement) return;

      const containerRect = contentRef.current.getBoundingClientRect();
      const headingRect = headingElement.getBoundingClientRect();
      const relativeTop =
        headingRect.top - containerRect.top + contentRef.current.scrollTop;
      const containerPadding = 32;

      contentRef.current.scrollTo({
        top: relativeTop - containerPadding,
        behavior: "smooth",
      });
    },
    [tocItems]
  );

  const handleScroll = useCallback(() => {
    if (!contentRef.current || !tocItems?.length) return;

    const containerRect = contentRef.current.getBoundingClientRect();
    const scrollTop = contentRef.current.scrollTop;
    const containerPadding = 32;

    // 현재 화면에 보이는 헤딩 찾기
    let currentHeading = tocItems[0];

    for (const heading of tocItems) {
      const headingElement = contentRef.current.querySelector(`#${heading.id}`);
      if (!headingElement) continue;

      const headingRect = headingElement.getBoundingClientRect();
      const relativeTop = headingRect.top - containerRect.top;

      // 헤딩이 컨테이너 상단 패딩 위치에 가까워지면 현재 헤딩으로 설정
      if (relativeTop <= containerPadding + 10) {
        // 10px의 여유 추가
        currentHeading = heading;
      } else {
        break;
      }
    }

    setActiveId(currentHeading.id);
  }, [tocItems]);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    contentElement.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 활성 헤딩 설정

    return () => contentElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handlePostChange = async (newPost: Post) => {
    try {
      const fullPost = await getClientPost(newPost.id);
      onPostChange(fullPost);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  // 모달이 열리고 닫힐 때 body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  useEffect(() => {
    // 마크다운 내의 코드 블록에 언어 표시와 복사 버튼 추가
    const codeBlocks = document.querySelectorAll(".content pre");
    codeBlocks.forEach((block, index) => {
      const language = block.className.match(/language-(\w+)/)?.[1] || "text";
      block.setAttribute("data-language", language);

      // 복사 버튼 추가
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.innerHTML = `<span class="icon"><FiCopy /></span><span>Copy</span>`;
      copyButton.onclick = () => handleCopy(index, block.textContent || "");
      block.appendChild(copyButton);
    });
  }, [content]);

  const handleCopy = async (index: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  if (!isOpen) return null;

  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imageUrl = getPostImage(post.thumbnail);

  console.log("Post headings:", tocItems); // 목차 데이터 확인
  console.log("Current post:", post); // 전체 post 객체 확인

  const modalContent = (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          {prevPost && (
            <button
              className="nav_button prev"
              onClick={() => handlePostChange(prevPost)}
            >
              <div className="nav_info">
                <div className="nav_info_left">
                  <span className="arrow">←</span>
                  <span className="label">{t("modal.prev")}</span>
                </div>
                <span className="title">
                  {prevPost.translations[currentLang]?.title ||
                    prevPost.translations.en.title}
                </span>
              </div>
            </button>
          )}
          <h2>{title}</h2>
          {nextPost && (
            <button
              className="nav_button next"
              onClick={() => handlePostChange(nextPost)}
            >
              <div className="nav_info">
                <div className="nav_info_right">
                  <span className="label">{t("modal.next")}</span>
                  <span className="arrow">→</span>
                </div>
                <span className="title">
                  {nextPost.translations[currentLang]?.title ||
                    nextPost.translations.en.title}
                </span>
              </div>
            </button>
          )}
        </div>
        <div className="modal_meta">
          <div className="tags">
            {post.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
          <span className="date">{formattedDate}</span>
        </div>
        <div className="modal_body" ref={contentRef}>
          {post.thumbnail && (
            <div className="modal_thumbnail">
              <Image
                src={imageUrl}
                alt={title}
                width={800}
                height={600}
                priority
              />
            </div>
          )}
          <div className="content_wrapper">
            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: post.translations[currentLang].content,
              }}
            />
            {tocItems?.length > 0 && (
              <nav className="table_of_contents">
                <h3>{t("modal.toc")}</h3>
                <ul>
                  {tocItems.map((item: TocItem) => (
                    <li
                      key={item.id}
                      className={`toc_item ${
                        item.isMainTopic ? "main_topic" : "sub_topic"
                      } ${activeId === item.id ? "active" : ""}`}
                      onClick={() => scrollToHeading(item.id)}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
        <div className="modal_footer">
          <button className="close_button" onClick={onClose}>
            {t("modal.close")}
          </button>
        </div>
      </div>
    </div>
  );

  return <ModalPortal>{modalContent}</ModalPortal>;
};

export default PostModal;
