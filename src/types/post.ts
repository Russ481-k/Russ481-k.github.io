import { CATEGORY_ORDER } from "@/constants/categoryOrder";

export interface Translation {
  title: string;
  description: string;
  content: string;
  tocItems: TocItem[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
  isMainTopic: boolean;
  position: number;
}

export interface Post {
  id: string;
  date: string;
  category: (typeof CATEGORY_ORDER)[number];
  content: string;
  tags: string[];
  thumbnail: string;
  title: string;
  translations: {
    ko: Translation;
    en: Translation;
  };
  imageHeights: {
    [key: string]: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
