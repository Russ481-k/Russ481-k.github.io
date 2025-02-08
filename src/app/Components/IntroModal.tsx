"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "../Styles/post_modal.scss";

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroModal = ({ isOpen, onClose }: IntroModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
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

  const modalContent = (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h2>개발자 소개</h2>
          <button className="close_button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal_body">
          {/* 개발자 소개 내용 */}
          <div className="content">
            <h3>안녕하세요! 프론트엔드 개발자입니다.</h3>
            {/* 소개 내용 추가 */}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById("modal-root") || document.body
  );
};
