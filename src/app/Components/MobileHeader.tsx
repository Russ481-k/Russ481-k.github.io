"use client";
import { useState, useEffect, useRef } from "react";
import "../Styles/mobile_header.scss";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { useCategories } from "@/data/categories";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { IconBaseProps } from "react-icons";

interface MobileHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const MobileHeader = ({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
}: MobileHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const categories = useCategories();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!categories) {
    return null;
  }

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`mobile_header ${isOpen ? "expanded" : ""}`}>
      <div className="nav">
        <div className="mobile_header_container">
          <div className="left_section">
            {t("header.title")}
            <LanguageSelector />
          </div>
          <div className="category_dropdown" ref={categoryDropdownRef}>
            <button
              className="category_button"
              type="button"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsProfileOpen(false);
              }}
            >
              <span>
                {currentCategory?.name || t("categories.all")}
                <span className="count">
                  ({categoryCounts[selectedCategory] || 0})
                </span>
              </span>
              <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
            </button>
            {isOpen && (
              <div className="category_list">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category_item ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => {
                      handleCategorySelect(category.id);
                    }}
                  >
                    <span className="category_name">{category.name}</span>
                    <span className="count">
                      ({categoryCounts[category.id] || 0})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="profile" ref={profileDropdownRef}>
            <button
              className="profile_button"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsOpen(false);
              }}
            >
              <Image
                src="/images/profile0.jpg"
                alt="Profile"
                width={28}
                height={28}
                className="profile_image"
              />
            </button>

            {isProfileOpen && (
              <div className="profile_dropdown">
                <div className="profile_info">
                  <Image
                    src="/images/profile0.jpg"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="large_profile_image"
                  />
                  <h3>Bin</h3>
                  <p className="position">{t("profile.position")}</p>
                  <div className="social_links">
                    <a
                      href="https://github.com/Russ481-k"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t("profile.social.github")}
                    >
                      {FaGithub({ size: 16 } as IconBaseProps)}
                    </a>
                    <a
                      href="https://binsspace.notion.site/..."
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t("profile.social.notion")}
                    >
                      {SiNotion({ size: 16 } as IconBaseProps)}
                    </a>
                    <a
                      href="mailto:yunsubin481@gmail.com"
                      title={t("profile.social.email")}
                    >
                      {FaEnvelope({ size: 16 } as IconBaseProps)}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
