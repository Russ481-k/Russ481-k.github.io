import { TocItem } from "@/types/post";

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .trim()
    .replace(/[\s]+/g, "-");
};

export const extractHeadings = (markdown: string): TocItem[] => {
  const lines = markdown.split("\n");
  const headings: TocItem[] = [];
  const idCounts: { [key: string]: number } = {};
  let position = 0;

  lines.forEach((line) => {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      let id = slugify(text);

      if (idCounts[id]) {
        idCounts[id]++;
        id = `${id}-${idCounts[id] - 1}`;
      } else {
        idCounts[id] = 1;
      }

      headings.push({
        id,
        text,
        level,
        isMainTopic: level === 1,
        position: position++, // Simple sequence
      });
    }
  });

  return headings;
};
