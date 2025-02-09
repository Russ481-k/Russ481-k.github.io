"use client";
import { useState, useEffect, useRef } from "react";
import "../Styles/mobile_header.scss";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiNotion } from "react-icons/si";

interface MobileHeaderProps {
  categories: {
    id: string;
    name: string;
    description: string;
    externalLink?: string;
  }[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const MobileHeader = ({
  categories,
  selectedCategory,
  onCategorySelect,
  categoryCounts,
}: MobileHeaderProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategoryName = categories?.find(
    (cat) => cat.id === selectedCategory
  )?.name;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 카테고리 드롭다운 외부 클릭 처리
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }

      // 프로필 드롭다운 외부 클릭 처리
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mobile_header">
      <Link href="/" className="logo">
        Bin&apos;s Space
      </Link>
      <div className="nav">
        <div className="category_dropdown" ref={categoryDropdownRef}>
          <button
            className="dropdown_button"
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsProfileOpen(false);
            }}
          >
            <span>{selectedCategoryName || "All"}</span>
            <FaChevronDown
              className={`chevron ${isCategoryOpen ? "open" : ""}`}
            />
          </button>
          {isCategoryOpen && (
            <div className="dropdown_menu">
              {categories?.map((category) => (
                <button
                  key={category.id}
                  className={`menu_item ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => {
                    onCategorySelect(category.id);
                    setIsCategoryOpen(false);
                  }}
                >
                  <span>{category.name}</span>
                  <span className="count">
                    {categoryCounts[category.id] || 0}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="profile" ref={profileDropdownRef}>
        <button
          className="profile_button"
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsCategoryOpen(false);
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
              <p className="position">Full Stack Developer</p>
              <div className="social_links">
                <a
                  href="https://github.com/Russ481-k"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.notion.so/binllionaire/Bin-s-Space-4d02e7c3c1d3476e935bf54a1757cf09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiNotion />
                </a>
                <a href="mailto:yunsubin481@gmail.com">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
