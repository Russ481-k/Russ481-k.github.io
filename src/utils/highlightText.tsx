import React from "react";

export const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;

  const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const splitRegex = new RegExp(`(${escaped})`, "gi");
  return text?.split(splitRegex).map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={i} className="highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
};
