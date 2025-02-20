"use client";
import { useState, useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
export function TopButton() {
  const [ScrollY, setScrollY] = useState(0);
  const [, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.scrollY);
    if (ScrollY > 300) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <button
      className="top_button"
      data-aos-easing="ease-in-out"
      data-aos="fade-left"
      type="button"
      onClick={handleTop}
    >
      Top
    </button>
  );
}
