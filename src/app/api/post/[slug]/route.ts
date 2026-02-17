import { NextResponse } from "next/server";
import { getPost, getAllPosts } from "@/utils/markdownLoader";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPost(params.slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching post ${params.slug}:`, error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
