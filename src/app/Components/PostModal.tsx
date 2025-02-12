"use client";
import { Post } from "@/types/post";
import { Tag } from "./Tag";
import { useEffect, useRef, useState, useCallback } from "react";
import "../Styles/post_modal.scss";
import Image from "next/image";
import { getPostImage } from "@/utils/getPostImage";
import { ModalPortal } from "./ModalPortal";
import React from "react";
import { getClientPost } from "@/utils/clientPosts";

interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  prevPost?: Post | null; // 이전 포스트
  nextPost?: Post | null; // 다음 포스트
  onPostChange: (post: Post) => void; // 포스트 변경 핸들러
}

export const PostModal = ({
  post,
  isOpen,
  onClose,
  prevPost,
  nextPost,
  onPostChange,
}: PostModalProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToHeading = useCallback(
    (id: string) => {
      const heading = post.tocItems?.find((h) => h.id === id);
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
    [post.tocItems]
  );

  const handleScroll = useCallback(() => {
    if (!contentRef.current || !post.tocItems?.length) return;

    const containerRect = contentRef.current.getBoundingClientRect();
    const scrollTop = contentRef.current.scrollTop;
    const containerPadding = 32;

    // 현재 화면에 보이는 헤딩 찾기
    let currentHeading = post.tocItems[0];

    for (const heading of post.tocItems) {
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
  }, [post.tocItems]);

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

  if (!isOpen) return null;

  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imageUrl = getPostImage(post.thumbnail);

  console.log("Post headings:", post.tocItems); // 목차 데이터 확인
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
                  <span className="label">이전 포스트</span>
                </div>
                <span className="title">{prevPost.title}</span>
              </div>
            </button>
          )}
          <h2>{post.title}</h2>
          {nextPost && (
            <button
              className="nav_button next"
              onClick={() => handlePostChange(nextPost)}
            >
              <div className="nav_info">
                <div className="nav_info_right">
                  <span className="label">다음 포스트</span>
                  <span className="arrow">→</span>
                </div>
                <span className="title">{nextPost.title}</span>
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
                alt={post.title}
                width={800}
                height={600}
                priority
              />
            </div>
          )}
          <div className="content_wrapper">
            <article
              className="content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {post.tocItems?.length > 0 && (
              <nav className="table_of_contents">
                <h3>Index</h3>
                <ul>
                  {post.tocItems.map((item) => (
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
            닫기
          </button>
        </div>
      </div>
    </div>
  );

  return <ModalPortal>{modalContent}</ModalPortal>;
};

export default PostModal;
