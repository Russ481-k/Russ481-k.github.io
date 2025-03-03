import { DynamicThumbnail } from "@/app/Components/DynamicThumbnail";
import React, { ReactElement } from "react";

export const getPostImage = (
  thumbnail: string | undefined,
  post?: { title: string; tags: string[]; id: string }
): string | ReactElement => {
  if (!thumbnail || thumbnail === "") {
    return React.createElement(DynamicThumbnail, {
      title: post?.title || "",
      tags: post?.tags || [],
      postId: post?.id || "default",
      className: "dynamic-thumbnail",
    });
  }

  if (thumbnail.startsWith("http")) {
    return thumbnail;
  }

  return thumbnail.startsWith("/") ? thumbnail : `/${thumbnail}`;
};
