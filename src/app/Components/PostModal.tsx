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
import LexicalEditor from "./Lexical/Editor";
import { extractHeadings } from "@/utils/markdownUtils";

interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  prevPost?: Post | null; // 이전 포스트
  nextPost?: Post | null; // 다음 포스트
  onPostChange: (post: Post) => void; // 포스트 변경 핸들러
  onTagClick?: (tag: string) => void;
}

const PostModal = ({
  post,
  isOpen,
  onClose,
  prevPost,
  nextPost,
  onPostChange,
  onTagClick,
}: PostModalProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "ko" | "en";

  const translation =
    post.translations?.[currentLang] || post.translations?.["en"];
  const { title, content } = translation;
  
  // Use DB tocItems or fallback to calculating them from content
  const tocItems = React.useMemo(() => {
    const items = (translation.tocItems?.length > 0)
      ? translation.tocItems 
      : extractHeadings(content || "");
    console.log("[PostModal] Calculated tocItems:", items.length);
    return items;
  }, [translation.tocItems, content]);

  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(null);
  
  // Callback ref to handle DOM element mounting/unmounting
  const onContentRefChange = useCallback((node: HTMLDivElement | null) => {
    setContentElement(node);
  }, []);

  const [activeId, setActiveId] = useState<string>("");
  // const contentRef = useRef<HTMLDivElement>(null); // Removed in favor of state+callback
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const scrollToHeading = useCallback(
    (id: string) => {
      const heading = tocItems?.find((h: TocItem) => h.id === id);
      if (!heading || !contentElement) return;

      // Use attribute selector to handle IDs starting with specific characters (e.g. numbers)
      const headingElement = contentElement.querySelector(`[id="${id}"]`);
      if (!headingElement) return;

      const containerRect = contentElement.getBoundingClientRect();
      const headingRect = headingElement.getBoundingClientRect();
      const relativeTop =
        headingRect.top - containerRect.top + contentElement.scrollTop;
      const containerPadding = 32;

      contentElement.scrollTo({
        top: relativeTop - containerPadding,
        behavior: "smooth",
      });
    },
    [tocItems, contentElement]
  );

  const handleScroll = useCallback(() => {
    if (!contentElement || !tocItems?.length) {
        // console.log("[PostModal] handleScroll: aborted", { hasRef: !!contentElement, hasToc: !!tocItems?.length });
        return;
    }
    // console.log("[PostModal] handleScroll: running");

    const { scrollTop, scrollHeight, clientHeight } = contentElement;
    const containerRect = contentElement.getBoundingClientRect();
    const containerPadding = 32;

    // Check if we are at the bottom of the content
    // If so, highlight the last item regardless of its position
    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 50) {
      setActiveId(tocItems[tocItems.length - 1].id);
      return;
    }

    // Default: Find the last heading that has passed the top threshold
    let currentHeading = tocItems[0];

    for (const heading of tocItems) {
      // Use attribute selector here as well
      const headingElement = contentElement.querySelector(
        `[id="${heading.id}"]`
      );
      if (!headingElement) continue;

      const headingRect = headingElement.getBoundingClientRect();
      const relativeTop = headingRect.top - containerRect.top;

      // Check if the heading is above the threshold (with some buffer)
      // Increased buffer slightly to make it feel more natural
      if (relativeTop <= containerPadding + 100) {
        currentHeading = heading;
      } else {
        break;
      }
    }

    // console.log("Current active ID:", currentHeading.id);
    // console.log("[PostModal] handleScroll: Setting activeId", currentHeading.id);
    setActiveId(currentHeading.id);
  }, [tocItems, contentElement]);

  // Effect to attach observers when contentElement changes or handleScroll updates
  useEffect(() => {
    if (!contentElement) {
        console.log("[PostModal] useEffect: no contentElement");
        return;
    }
    console.log("[PostModal] useEffect: attaching observers");

    contentElement.addEventListener("scroll", handleScroll);
    
    // ResizeObserver: 콘텐츠 크기가 변할 때
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    resizeObserver.observe(contentElement);

    // MutationObserver: ID 속성 변경 감지
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "id") {
          console.log("[PostModal] MutationObserver: ID changed", mutation.target);
          shouldUpdate = true;
        }
      });
      if (shouldUpdate) {
        console.log("[PostModal] MutationObserver: Triggering handleScroll");
        handleScroll();
      }
    });
    
    mutationObserver.observe(contentElement, {
      attributes: true,
      attributeFilter: ["id"],
      subtree: true,
    });

    handleScroll(); // Initial check

    return () => {
      contentElement.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [contentElement, handleScroll]);

  const handlePostChange = async (newPost: Post) => {
    try {
      console.log("[PostModal] handlePostChange requesting:", newPost.id);
      const fullPost = await getClientPost(newPost.id);
      console.log("[PostModal] handlePostChange received:", fullPost ? fullPost.id : "null");
      if (fullPost) {
        onPostChange(fullPost);
      } else {
        console.error("Post not found");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  // 포스트 변경 시 스크롤 최상단 이동
  useEffect(() => {
    // console.log("[PostModal] useEffect[post.id]: reset scroll", post.id);
    if (contentElement) {
      contentElement.scrollTo(0, 0);
      // console.log("[PostModal] contentRef.current.scrollTop after scrollTo:", contentElement.scrollTop);
    }
  }, [post.id, contentElement]);


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
              <Tag 
                key={tag} 
                name={tag} 
                onClick={(t) => {
                    if (onTagClick) {
                        onTagClick(t);
                        onClose(); // Close modal on tag click
                    }
                }} 
              />
            ))}
          </div>
          <span className="date">{formattedDate}</span>
        </div>
        <div className="modal_body" ref={onContentRefChange}>
          {post.thumbnail && typeof imageUrl === "string" && (
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
            <div className="content">
              <LexicalEditor
                initialMarkdown={post.translations[currentLang].content}
                readOnly={true}
              />
            </div>
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
