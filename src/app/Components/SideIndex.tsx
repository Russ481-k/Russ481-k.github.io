"use client";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import "../Styles/side_index.scss";
export const SideIndex = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="side_index" data-aos="fade-left">
      SideIndex
    </div>
  );
};
