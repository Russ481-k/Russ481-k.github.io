import { Post } from "@/types/post";

export async function getClientPosts(): Promise<Post[]> {
  try {
    const response = await fetch("/api/posts", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("Error fetching posts HTTP error", response.status);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getClientPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`/api/post/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`Error fetching post ${id} HTTP error`, response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}
