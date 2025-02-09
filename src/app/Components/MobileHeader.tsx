"use client";
import { useState } from "react";
import "../Styles/mobile_header.scss";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="mobile_header">
      <Link href="/" className="logo">
        Bin&apos;s Space
      </Link>
      <div className="nav">
        <div className="categories">
          {categories?.map((category) => (
            <button
              key={category.id}
              className={`category_item ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="profile">
        <Image
          src="/images/profile0.jpg"
          alt="Profile"
          width={28}
          height={28}
          className="profile_image"
        />
      </div>
    </div>
  );
};
