import "../Styles/footer.scss";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <h1>Bin&apos;s Space</h1>
      </div>
      <div className="footer_mid">
        ⓒ 2023. Russell.Youn™ All rights reserved.
      </div>
      <div className="footer_right">
        <nav className="nav">
          <a href="/">Notion</a>
          <a href="/about">Post</a>
          <a href="/about"></a>
        </nav>
      </div>
    </div>
  );
};
