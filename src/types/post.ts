import { CATEGORY_ORDER } from "@/constants/categoryOrder";

export interface TocItem {
  id: string;
  text: string;
  level: number;
  isMainTopic: boolean;
  position: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
  category: (typeof CATEGORY_ORDER)[number];
  tags: string[];
  tocItems: TocItem[];
  imageHeights: Record<string, number>;
  thumbnail?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
