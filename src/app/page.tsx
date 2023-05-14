import Head from "next/head";
import { Body } from "./Components/Body";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";

import "./Styles/main.scss";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <main>
        <div className="scroll_container">
          <Header></Header>
          <Body></Body>
          <Footer></Footer>

        </div>
      </main>
    </div>
  );
}
