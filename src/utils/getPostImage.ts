export function getPostImage(path: string | undefined): string {
  if (!path) {
    return "/images/posts/default-thumbnail.jpg";
  }

  // public 폴더의 이미지 경로 확인
  if (path.startsWith("/images/")) {
    return path;
  }

  return "/images/posts/default-thumbnail.jpg";
}
