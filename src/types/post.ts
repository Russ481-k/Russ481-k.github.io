export interface Post {
  id: string;
  title: string;
  content: string;
  plainContent: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
