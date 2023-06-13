import { Body } from "./Components/Body";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { TopButton } from "./TopButton";

import "./Styles/main.scss";

export default function Home() {
  return (
    <div>
      <main>
        <div className="scroll_container">
          <Header></Header>
          <Body></Body>
          <TopButton></TopButton>
          <Footer></Footer>
        </div>
      </main>
    </div>
  );
}
