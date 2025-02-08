import { getAllPosts } from "@/utils/posts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await getAllPosts();
    // 배열인지 확인
    if (!Array.isArray(posts)) {
      return NextResponse.json(
        { error: "Posts data is not an array" },
        { status: 500 }
      );
    }
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
