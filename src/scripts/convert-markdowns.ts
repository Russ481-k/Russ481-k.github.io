import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");
const koDir = path.join(postsDir, "ko");
const enDir = path.join(postsDir, "en");

// 디렉토리 생성
if (!fs.existsSync(koDir)) fs.mkdirSync(koDir, { recursive: true });
if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });

// 루트의 마크다운 파일들을 ko와 en 디렉토리로 이동
fs.readdirSync(postsDir).forEach((file) => {
  if (file.endsWith(".md") && file !== "README.md") {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // 한글 버전 저장
    fs.writeFileSync(path.join(koDir, file), content);

    // 영문 버전 생성
    const { data, content: markdownContent } = matter(content);
    const enContent = matter.stringify(markdownContent, {
      ...data,
      title: data.title + " (EN)",
      description: data.description + " (EN)",
    });
    fs.writeFileSync(path.join(enDir, file), enContent);

    // 원본 파일 삭제 (선택사항)
    // fs.unlinkSync(filePath);
  }
});

console.log("Markdown files have been converted and organized!");
