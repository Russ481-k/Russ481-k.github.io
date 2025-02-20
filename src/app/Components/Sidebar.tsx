"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Styles/sidebar.scss";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { CONTACT } from "@/constants/contact";

interface SidebarProps {
  categories: {
    id: string;
    name: string;
    description: string;
    externalLink?: string;
  }[];
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  categoryCounts: {
    [key: string]: number;
  };
}

export const Sidebar = ({
  categories,
  onCategorySelect,
  selectedCategory,
  categoryCounts,
}: SidebarProps) => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const { t } = useTranslation();

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
    navigator.clipboard.writeText(CONTACT.EMAIL);
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
            alt={t("profile.image")}
            priority
          />
        </div>
        <div className="profile_text">
          <h1 className="profile_name">{t("profile.name")}</h1>
          <h5 className="profile_info">
            <span>{t("profile.blog")} : </span>
            <a className="info_link" href={CONTACT.NOTION_URL} target="_blank">
              Notion
            </a>
          </h5>
          <h5 className="profile_info">
            <span>{t("profile.emailLabel")} : </span>
            <a className="info_link" href="#" onClick={handleEmailClick}>
              {CONTACT.EMAIL}
              {showCopyTooltip && (
                <span className="copy_tooltip">{t("profile.copied")}</span>
              )}
            </a>
          </h5>
          <h5 className="profile_info">
            {t("profile.positionLabel")} : {t("profile.position")}
          </h5>
        </div>

        <div className="profile_categories">
          <h3>{t("sidebar.category")}</h3>
          {categories?.map((category) => (
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
