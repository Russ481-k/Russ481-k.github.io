export function getPostImage(path: string | undefined): string {
  console.log("Image path received:", path);

  if (!path) {
    console.log("Using default image");
    return "/images/posts/default-thumbnail.jpg";
  }

  // public 폴더의 이미지 경로 확인
  if (path.startsWith("/images/")) {
    console.log("Using image from path:", path);
    return path;
  }

  console.log("Falling back to default image");
  return "/images/posts/default-thumbnail.jpg";
}
