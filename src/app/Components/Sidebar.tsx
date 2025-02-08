"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Styles/sidebar.scss";
import Image from "next/image";
import { categories } from "@/data/categories";

interface SidebarProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  categoryCounts: {
    [key: string]: number;
  };
}

export const Sidebar = ({
  onCategorySelect,
  selectedCategory,
  categoryCounts,
}: SidebarProps) => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleCategoryClick = (category: {
    id: string;
    externalLink?: string;
  }) => {
    if (category.externalLink) {
      window.open(category.externalLink, "_blank");
    } else {
      onCategorySelect(category.id);
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("yunsubin481@gmail.com");
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  return (
    <div className="sidebar" data-aos="fade-right">
      <div className="contents">
        <div className="profile_top">
          <Image
            className="profile_image"
            src="/images/profile2.jpg"
            width={200}
            height={200}
            alt="profile"
            priority
          />
        </div>
        <div className="profile_text">
          <h1 className="profile_name">Russ</h1>
          <h5 className="profile_info">
            <span>BLOG : </span>
            <a
              className="info_link"
              href="https://binsspace.notion.site/Bin-s-Space-1ebe0875dc7442cc91f7e1defc3802ab"
              target="_blank"
            >
              Notion
            </a>
          </h5>
          <h5 className="profile_info">
            <span>EMAIL : </span>
            <a className="info_link" href="#" onClick={handleEmailClick}>
              yunsubin481@gmail.com
              {showCopyTooltip && <span className="copy_tooltip">Copied!</span>}
            </a>
          </h5>
          <h5 className="profile_info">POSITION : Full Stack</h5>
          {/*TODO:
           */}
        </div>

        <div className="profile_categories">
          <h3>CATEGORY</h3>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category_item ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category_info">
                <h4>{category.name}</h4>
                <p>{category.description}</p>
              </div>
              <span className="post_count">
                {categoryCounts[category.id] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
