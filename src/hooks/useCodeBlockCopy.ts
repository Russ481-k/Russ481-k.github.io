"use client";
import { useEffect, useState } from "react";

export function useCodeBlockCopy(content: string | undefined) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleCopy = async (index: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".content pre");
    const addedButtons: HTMLButtonElement[] = [];
    codeBlocks.forEach((block, index) => {
      // Skip if already processed
      if (block.querySelector(".copy-button")) return;

      const language = block.className.match(/language-(\w+)/)?.[1] || "text";
      block.setAttribute("data-language", language);

      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.innerHTML = `<span class="icon"><FiCopy /></span><span>Copy</span>`;
      copyButton.onclick = () => handleCopy(index, block.textContent || "");
      block.appendChild(copyButton);
      addedButtons.push(copyButton);
    });

    return () => {
      addedButtons.forEach((btn) => btn.remove());
    };
  }, [content]);

  return { copiedStates };
}
