"use client";
import { Post } from "@/types/post";
import { Tag } from "./Tag";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "../Styles/post_modal.scss";
import Image from "next/image";
import { getPostImage } from "@/utils/getPostImage";
import { ModalPortal } from "./ModalPortal";

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
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
      // 스크롤 위치 복원
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

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
              onClick={() => onPostChange(prevPost)}
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
              onClick={() => onPostChange(nextPost)}
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
        <div className="modal_body">
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
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
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
