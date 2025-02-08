import { getAllPosts, getPostById } from "@/utils/posts";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostById(params.id);

  return {
    title: post?.title,
    description: post?.description,
  };
}

export async function generateStaticParams() {
  // posts 디렉토리에서 모든 포스트 파일을 읽어옴
  const posts = getAllPosts(); // 포스트 목록을 가져오는 함수

  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Post({ params }: Props) {
  const post = getPostById(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
