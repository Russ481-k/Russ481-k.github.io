"use client";
import ReactMarkdown from "react-markdown";
import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { highlightText } from "@/utils/highlightText";
import { getPostImage } from "@/utils/getPostImage";
import { getPostTranslation, formatPostDate } from "@/utils/postFormatting";
import type { Post as PostType } from "@/types/post";
import { Tag } from "./Tag";
import PostModal from "./PostModal";
import { useTranslation } from "react-i18next";

let aosInitialized = false;

interface PostProps extends PostType {
  searchTerm?: string;
  posts?: PostType[];
  onTagClick?: (tag: string) => void;
}

const Post = (props: PostProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "ko" | "en";

  // 현재 언어에 맞는 번역 데이터 선택
  const translation = getPostTranslation(props, currentLang);
  const { title, content } = translation;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = getPostImage(props.thumbnail, {
    title: translation.title,
    tags: props.tags,
    id: props.id,
  });
  const formattedDate = formatPostDate(props.date);
  const [currentPost, setCurrentPost] = useState(props);

  const contentPreview = useMemo(
    () => content.split("\n").slice(0, 8).join("\n"),
    [content]
  );

  useEffect(() => {
    if (!aosInitialized) {
      AOS.init();
      aosInitialized = true;
    }
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const visibleTags = props.tags?.slice(0, 3) || [];
  const remainingTags = props.tags?.length > 3 ? props.tags.length - 3 : 0;

  const { prevPost, nextPost } = useMemo(() => {
    const currentIndex = props.posts?.findIndex(
      (post) => post.id === currentPost.id
    );

    return {
      prevPost:
        currentIndex !== undefined && currentIndex !== -1 && currentIndex < (props.posts?.length ?? 0) - 1
          ? props.posts?.[currentIndex + 1]
          : null,
      nextPost:
        currentIndex !== undefined && currentIndex !== -1 && currentIndex > 0
          ? props.posts?.[currentIndex - 1]
          : null,
    };
  }, [currentPost.id, props.posts]);

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
          {typeof imageUrl === "string" ? (
            <Image
              src={imageUrl}
              alt={title}
              className="post_image"
              width={260}
              height={260}
              priority
            />
          ) : (
            imageUrl // DynamicThumbnail 컴포넌트 렌더링
          )}
        </div>
        <div className="post_content">
          <div className="post_header">
            <div className="title_section">
              <h1>{highlightText(title || "", props.searchTerm || "")}</h1>
              <div className="tags">
                {visibleTags.map((tag, index) => (
                  <Tag 
                    key={`${tag}-${index}`} 
                    name={tag} 
                    onClick={props.onTagClick} 
                  />
                ))}
                {remainingTags > 0 && (
                  <span className="more_tags">+{remainingTags}</span>
                )}
              </div>
            </div>
            <span className="date">{formattedDate}</span>
          </div>
          <div className="markdown-content">
            <ReactMarkdown>
              {contentPreview}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <PostModal
        post={currentPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prevPost={prevPost}
        nextPost={nextPost}
        onPostChange={(newPost: PostType) => {
          setCurrentPost({
            ...newPost,
            searchTerm: props.searchTerm,
            posts: props.posts,
          });
        }}
        onTagClick={props.onTagClick}
      />
    </>
  );
};

export default Post;
