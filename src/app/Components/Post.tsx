"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { highlightText } from "@/utils/highlightText";
import { getPostImage } from "@/utils/getPostImage";
import type { Post } from "@/types/post";
import PostModal from "./PostModal";
import { useTranslation } from "react-i18next";

interface PostProps extends Post {
  searchTerm?: string;
  posts?: Post[];
}

const Post = (props: PostProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "ko" | "en";

  // 현재 언어에 맞는 번역 데이터 선택
  const translation =
    props.translations[currentLang] || props.translations["en"];
  const { title, description, content, tocItems } = translation;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = getPostImage(props.thumbnail);
  const formattedDate = new Date(props.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [currentPost, setCurrentPost] = useState(props);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const visibleTags = props.tags?.slice(0, 3) || [];
  const remainingTags = props.tags?.length > 3 ? props.tags.length - 3 : 0;

  const getAdjacentPosts = (currentPost: PostProps) => {
    const currentIndex = props.posts?.findIndex(
      (post) => post.id === currentPost.id
    );

    return {
      prevPost:
        currentIndex && currentIndex < (props.posts?.length ?? 0) - 1
          ? props.posts?.[currentIndex + 1]
          : null,
      nextPost:
        currentIndex && currentIndex > 0
          ? props.posts?.[currentIndex - 1]
          : null,
    };
  };

  const { prevPost, nextPost } = getAdjacentPosts(currentPost);

  return (
    <>
      <div
        className="post"
        data-aos-anchor-placement="top"
        data-aos-delay="100"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos="flip-up"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="post_image_container">
          <Image
            className="post_image"
            src={imageUrl}
            width={260}
            height={260}
            alt={title || "post thumbnail"}
            priority
          />
        </div>
        <div className="post_content">
          <div className="post_header">
            <div className="title_section">
              <h1>{highlightText(title || "", props.searchTerm || "")}</h1>
              <div className="tags">
                {visibleTags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
                {remainingTags > 0 && (
                  <span className="more_tags">+{remainingTags}</span>
                )}
              </div>
            </div>
            <span className="date">{formattedDate}</span>
          </div>
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{
              __html: props.searchTerm
                ? highlightText(content, props.searchTerm)
                : content,
            }}
          />
        </div>
      </div>
      <PostModal
        post={currentPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prevPost={prevPost}
        nextPost={nextPost}
        onPostChange={(newPost: Post) => {
          setCurrentPost({
            ...newPost,
            searchTerm: props.searchTerm,
            posts: props.posts,
          });
        }}
      />
    </>
  );
};

export default Post;
