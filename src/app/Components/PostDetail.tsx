"use client";
import { Post as PostType } from "@/types/post";
import { Tag } from "./Tag";
import Image from "next/image";
import { getPostImage } from "@/utils/getPostImage";
import "../Styles/post_detail.scss";

export const PostDetail = ({ post }: { post: PostType }) => {
  const imageUrl = getPostImage(post.thumbnail);
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="post_detail">
      <div className="post_header">
        <h1>{post.title}</h1>
        <div className="post_meta">
          <div className="tags">
            {post.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
          <span className="date">{formattedDate}</span>
        </div>
      </div>
      {post.thumbnail && (
        <div className="post_image">
          <Image
            src={imageUrl}
            alt={post.title}
            width={800}
            height={400}
            priority
          />
        </div>
      )}
      <div
        className="post_content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};
