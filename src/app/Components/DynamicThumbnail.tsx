"use client";

import { useMemo } from "react";
import { generateGradient } from "@/utils/generateGradient";

interface DynamicThumbnailProps {
  title: string;
  tags: string[];
  postId: string;
  className?: string;
}

export const DynamicThumbnail = ({
  title,
  tags,
  postId,
  className = "",
}: DynamicThumbnailProps) => {
  // 포스트 ID를 기반으로 그라디언트 생성
  const gradientStyle = useMemo(() => {
    const { gradient, colors } = generateGradient(postId);

    return {
      background: gradient,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      borderRadius: "8px",
      color: "white",
      textAlign: "center" as const,
      boxShadow: `0 4px 20px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)`,
    };
  }, [postId]);

  return (
    <div style={gradientStyle} className={className}>
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "0.25rem 0.75rem",
              borderRadius: "50px",
              fontSize: "0.8rem",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
