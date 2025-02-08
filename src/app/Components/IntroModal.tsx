"use client";

import { useEffect, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import "../Styles/modal.scss";

interface IntroModalProps {
  post: {
    title: string;
    content: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const IntroModal = ({ post, isOpen, onClose }: IntroModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent: ReactElement = (
    <div className="modal_overlay" onClick={onClose}>
      <div
        className="modal_content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal_header">
          <h2>{post.title}</h2>
          <button className="close_button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal_body">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(
    // @ts-ignore
    modalContent,
    document.getElementById("modal-root") || document.body
  );
};
