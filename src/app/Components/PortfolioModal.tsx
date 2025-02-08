"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactElement } from "react";
import "../Styles/post_modal.scss";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal = ({ isOpen, onClose }: PortfolioModalProps) => {
  // ... IntroModal과 유사한 useEffect 로직

  if (!isOpen) return null;

  const modalContent: ReactElement = (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <button className="close_button" onClick={onClose}>
            Portfolio
          </button>
        </div>
        <div className="modal_body">
          {/* 포트폴리오 내용 */}
          <div className="content">
            <h3>프로젝트 목록</h3>
            {/* 프로젝트 목록 추가 */}
          </div>
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
