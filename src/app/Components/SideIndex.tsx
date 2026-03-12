"use client";
import { useRef } from "react";
import "../Styles/side_index.scss";
import { TechIcon } from "./TechIcon";
import { useKeywordExtraction } from "@/hooks/useKeywordExtraction";

interface SideIndexProps {
  searchResults: string[];
  onKeywordSelect: (keyword: string) => void;
}

export const SideIndex = ({
  searchResults,
  onKeywordSelect,
}: SideIndexProps) => {
  const keywords = useKeywordExtraction(searchResults);
  const keywordListRef = useRef<HTMLDivElement>(null);

  const renderKeywords = () => {
    return keywords.map(({ word, count, isTechStack }) => (
      <div
        key={word}
        className={`keyword_item ${isTechStack ? "tech_stack" : ""}`}
        onClick={() => onKeywordSelect(word)}
      >
        <span className="word">
          {isTechStack && (
            <span className="tech_icon">
              <TechIcon name={word} />
            </span>
          )}
          {word}
        </span>
        <span className="count">{count}</span>
      </div>
    ));
  };

  return (
    <div className="side_index">
      <div className="contents">
        <h3>Keywords</h3>
        <div className="keyword_list" ref={keywordListRef}>
          <div className="keywords_container">
            {renderKeywords()}
          </div>
        </div>
      </div>
    </div>
  );
};
