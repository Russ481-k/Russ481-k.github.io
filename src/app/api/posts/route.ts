import { NextResponse } from "next/server";
import { getAllPosts } from "@/utils/markdownLoader";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
