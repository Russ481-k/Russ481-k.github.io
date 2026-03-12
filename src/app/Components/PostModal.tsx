"use client";
import { Post, TocItem } from "@/types/post";
import { Tag } from "./Tag";
import { useEffect, useState, useCallback } from "react";
import "../Styles/post_modal.scss";
import Image from "next/image";
import { getPostImage } from "@/utils/getPostImage";
import { getPostTranslation, formatPostDate } from "@/utils/postFormatting";
import { ModalPortal } from "./ModalPortal";
import React from "react";
import { getClientPost } from "@/utils/clientPosts";
import { useTranslation } from "react-i18next";
import LexicalEditor from "./Lexical/Editor";
import { extractHeadings } from "@/utils/markdownUtils";
import { useTocTracking } from "@/hooks/useTocTracking";
import { useCodeBlockCopy } from "@/hooks/useCodeBlockCopy";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

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

  const translation = getPostTranslation(post, currentLang);
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

  // Custom hooks
  const { activeHeadingId, scrollToHeading } = useTocTracking(contentElement, tocItems);
  useCodeBlockCopy(content);
  useBodyScrollLock(isOpen);

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
    if (contentElement) {
      contentElement.scrollTo(0, 0);
    }
  }, [post.id, contentElement]);

  if (!isOpen) return null;

  const formattedDate = formatPostDate(post.date);

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
                  {getPostTranslation(prevPost, currentLang).title}
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
                  {getPostTranslation(nextPost, currentLang).title}
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
                      } ${activeHeadingId === item.id ? "active" : ""}`}
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
