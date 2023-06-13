"use client";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const Post = ({ title, content }: any) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className="post"
      data-aos-anchor-placement="top"
      data-aos-delay="100"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos="flip-up"
    >
      <div>
        <img className="post_image" src="/images/baseImage_2.jpg" alt="image" />
      </div>
      <div>
        <div title={title} />
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Post;
