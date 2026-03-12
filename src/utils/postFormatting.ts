import type { Post, Translation } from "@/types/post";

export function getPostTranslation(
  post: Post,
  lang: "ko" | "en"
): Translation {
  return post.translations[lang] || post.translations["en"];
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
