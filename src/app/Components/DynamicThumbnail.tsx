"use client";

import { useEffect, useRef } from "react";
import { generateGradient } from "@/utils/generateGradient";

interface DynamicThumbnailProps {
  title: string;
  tags: string[];
  width: number;
  height: number;
  postId: string;
}

export const DynamicThumbnail = ({
  title,
  tags,
  width,
  height,
  postId,
}: DynamicThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(" ");
    let line = "";
    let lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // 모든 라인의 총 높이 계산
    const totalHeight = lines.length * lineHeight;
    const startY = y - totalHeight / 2 + lineHeight / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line.trim(), x, startY + i * lineHeight);
    });

    return startY + lines.length * lineHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 배경 그라데이션 설정
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    const gradientStyle = generateGradient(postId);
    const colors = gradientStyle.match(/hsl\(\d+,\s*\d+%,\s*\d+%\)/g) || [];

    colors.forEach((color, index) => {
      gradient.addColorStop(index, color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 텍스트 스타일 설정
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    // 제목 그리기
    ctx.font = "bold 24px Pretendard";
    const maxWidth = width * 0.8;
    const lineHeight = 30;
    const padding = 40; // 상하 여백

    // 제목과 태그의 총 높이 계산을 위한 임시 측정
    const tempLines = [];
    let tempLine = "";
    const words = title.split(" ");

    for (let n = 0; n < words.length; n++) {
      const testLine = tempLine + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        tempLines.push(tempLine);
        tempLine = words[n] + " ";
      } else {
        tempLine = testLine;
      }
    }
    tempLines.push(tempLine);

    const titleHeight = tempLines.length * lineHeight;
    const tagsHeight = Math.min(tags.length, 3) * 20;
    const totalContentHeight = titleHeight + tagsHeight + 20; // 20은 제목과 태그 사이 간격

    // 컨텐츠를 중앙에 배치하기 위한 시작 y좌표 계산
    const startY = (height - totalContentHeight) / 2;

    // 제목 그리기
    const endY = wrapText(
      ctx,
      title,
      width / 2,
      startY + titleHeight / 2,
      maxWidth,
      lineHeight
    );

    // 태그 그리기
    ctx.font = "14px Pretendard";
    const visibleTags = tags.slice(0, 3);
    visibleTags.forEach((tag, index) => {
      ctx.fillText(`#${tag}`, width / 2, endY + 20 + index * 20);
    });
  }, [title, tags, width, height, postId]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ borderRadius: "8px" }}
    />
  );
};
