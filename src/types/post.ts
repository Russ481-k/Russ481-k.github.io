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
  category: string;
  tags: string[];
  description?: string;
  thumbnail?: string;
  tocItems: TocItem[];
  imageHeights: Record<string, number>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
