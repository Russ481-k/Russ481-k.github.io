import { getAllPosts, getPostsByCategory } from "@/utils/mdUtils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const posts =
      category && category !== "all"
        ? await getPostsByCategory(category)
        : await getAllPosts();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
