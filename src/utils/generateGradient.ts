const generateColorFromHash = (str: string, index: number = 0) => {
  // 문자열을 해시값으로 변환
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 색상 범위를 청색-초록 계열로 제한 (180-240도)
  const baseHue = 180; // 청록색 시작점
  const hueRange = 60; // 색상 범위 (180-240도)
  const h = baseHue + (Math.abs(hash + index * 30) % hueRange);

  // 채도와 명도를 무드있게 조정
  const s = 55 + (hash % 20); // 채도 55-75% (더 차분하게)
  const l = 40 + (hash % 3); // 명도 20-35% (더 어둡게)

  return `hsl(${h}, ${s}%, ${l}%)`;
};

interface GradientResult {
  colors: string[];
  angle: number;
  gradient: string;
}

export const generateGradient = (postId: string): GradientResult => {
  const color1 = generateColorFromHash(postId);
  const color2 = generateColorFromHash(postId, 1);
  const angle =
    Math.abs(
      postId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % 360;

  return {
    colors: [color1, color2],
    angle: angle,
    gradient: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
  };
};
