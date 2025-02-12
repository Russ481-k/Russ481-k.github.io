import { Post } from "@/types/post";

export async function getClientPosts() {
  const response = await fetch("/data/posts.json");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json() as Promise<Post[]>;
}

export async function getClientPost(id: string) {
  const response = await fetch(`/data/posts/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${id}`);
  }
  return response.json() as Promise<Post>;
}
