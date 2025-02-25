import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../../../public/font/pretendard/Pretendard-Thin.subset.woff2",
      weight: "100",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-ExtraLight.subset.woff2",
      weight: "200",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-Light.subset.woff2",
      weight: "300",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-Bold.subset.woff2",
      weight: "700",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
    },
    {
      path: "../../../public/font/pretendard/Pretendard-Black.subset.woff2",
      weight: "900",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "sans-serif",
  ],
});
