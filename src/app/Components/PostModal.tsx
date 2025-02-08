"use client";
import { Post } from "@/types/post";
import { Tag } from "./Tag";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "../Styles/post_modal.scss";
import Image from "next/image";
import { getPostImage } from "@/utils/getPostImage";

interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export const PostModal = ({ post, isOpen, onClose }: PostModalProps) => {
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
          <h2>{post.title}</h2>
          <button className="close_button" onClick={onClose}>
            ×
          </button>
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
                width={1200}
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
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById("modal-root") || document.body
  );
};
