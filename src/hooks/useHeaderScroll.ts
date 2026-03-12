"use client";

import { useState, useEffect } from "react";

export function useHeaderScroll() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsExpanded(false);
        setIsInitial(false);
      } else if (window.scrollY === 0 && isInitial) {
        setIsExpanded(true);
      }
    };

    const handleClick = () => {
      if (isInitial) {
        setIsExpanded(false);
        setIsInitial(false);
        window.scrollTo({
          top: 1,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, [isInitial]);

  return { isExpanded, isInitial };
}
