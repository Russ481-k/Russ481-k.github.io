"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { TocItem } from "@/types/post";

export function useTocTracking(
  contentElement: HTMLDivElement | null,
  tocItems: TocItem[]
) {
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");

  const scrollToHeading = useCallback(
    (id: string) => {
      const heading = tocItems?.find((h: TocItem) => h.id === id);
      if (!heading || !contentElement) return;

      const headingElement = contentElement.querySelector(`[id="${id}"]`);
      if (!headingElement) return;

      const containerRect = contentElement.getBoundingClientRect();
      const headingRect = headingElement.getBoundingClientRect();
      const relativeTop =
        headingRect.top - containerRect.top + contentElement.scrollTop;
      const containerPadding = 32;

      contentElement.scrollTo({
        top: relativeTop - containerPadding,
        behavior: "smooth",
      });
    },
    [tocItems, contentElement]
  );

  const handleScroll = useCallback(() => {
    if (!contentElement || !tocItems?.length) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = contentElement;
    const containerRect = contentElement.getBoundingClientRect();
    const containerPadding = 32;

    // Check if we are at the bottom of the content
    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 50) {
      setActiveHeadingId(tocItems[tocItems.length - 1].id);
      return;
    }

    // Default: Find the last heading that has passed the top threshold
    let currentHeading = tocItems[0];

    for (const heading of tocItems) {
      const headingElement = contentElement.querySelector(
        `[id="${heading.id}"]`
      );
      if (!headingElement) continue;

      const headingRect = headingElement.getBoundingClientRect();
      const relativeTop = headingRect.top - containerRect.top;

      if (relativeTop <= containerPadding + 100) {
        currentHeading = heading;
      } else {
        break;
      }
    }

    setActiveHeadingId(currentHeading.id);
  }, [tocItems, contentElement]);

  // Stable ref for handleScroll so observers don't need to be re-attached
  const handleScrollRef = useRef(handleScroll);
  useEffect(() => {
    handleScrollRef.current = handleScroll;
  }, [handleScroll]);

  // Effect to attach observers only when contentElement changes
  useEffect(() => {
    if (!contentElement) {
      console.log("[useTocTracking] no contentElement");
      return;
    }
    console.log("[useTocTracking] attaching observers");

    const stableScrollHandler = () => handleScrollRef.current();

    contentElement.addEventListener("scroll", stableScrollHandler);

    // ResizeObserver: when content size changes
    const resizeObserver = new ResizeObserver(() => {
      handleScrollRef.current();
    });
    resizeObserver.observe(contentElement);

    // MutationObserver: detect ID attribute changes
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "id") {
          console.log("[useTocTracking] MutationObserver: ID changed", mutation.target);
          shouldUpdate = true;
        }
      });
      if (shouldUpdate) {
        console.log("[useTocTracking] MutationObserver: Triggering handleScroll");
        handleScrollRef.current();
      }
    });

    mutationObserver.observe(contentElement, {
      attributes: true,
      attributeFilter: ["id"],
      subtree: true,
    });

    handleScrollRef.current(); // Initial check

    return () => {
      contentElement.removeEventListener("scroll", stableScrollHandler);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [contentElement]);

  return { activeHeadingId, scrollToHeading };
}
