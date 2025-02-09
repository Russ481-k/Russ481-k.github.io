import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import "../Styles/footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <h1>Bin&apos;s Space</h1>
      </div>
      <div className="footer_mid">
        © 2024 Bin&apos;s Space. All rights reserved.
      </div>
      <div className="footer_right">
        <div className="social_links">
          <Link
            href="https://github.com/Russ481-k"
            target="_blank"
            rel="noopener noreferrer"
            className="social_link"
            aria-label="GitHub Profile"
          >
            <FaGithub size={16} />
          </Link>
          <Link
            href="https://binsspace.notion.site/Bin-s-Space-1ebe0875dc7442cc91f7e1defc3802ab"
            target="_blank"
            rel="noopener noreferrer"
            className="social_link"
            aria-label="Notion Page"
          >
            <SiNotion size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
