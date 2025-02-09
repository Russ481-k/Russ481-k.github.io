"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { highlightText } from "@/utils/highlightText";
import { getPostImage } from "@/utils/getPostImage";
import { Tag } from "@/app/Components/Tag";
import { PostModal } from "../Components/PostModal";

interface PostProps {
  id: string;
  title: string;
  content: string;
  plainContent: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  searchTerm: string;
  thumbnail?: string;
}

const Post = (props: PostProps) => {
  const { title, searchTerm, tags, date, thumbnail } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = getPostImage(thumbnail);
  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const visibleTags = tags?.slice(0, 3) || [];
  const remainingTags = tags?.length > 3 ? tags.length - 3 : 0;

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
              <h1>{highlightText(title, searchTerm)}</h1>
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
              __html: searchTerm
                ? highlightText(props.content, searchTerm)
                : props.content,
            }}
          />
        </div>
      </div>
      <PostModal
        post={props}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Post;
