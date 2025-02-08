export type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  plainContent: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string;
};

export interface Category {
  id: string;
  name: string;
  description: string;
}
