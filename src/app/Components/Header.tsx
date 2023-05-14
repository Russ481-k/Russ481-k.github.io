import "../Styles/header.scss"
export const Header = () => {
  return (
    <div className="header">
        <div className="header_left">
      <h1>Bin&apos;s Space</h1>
      </div>
      <div className="header_mid">
      </div>
      <div className="header_right">
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      </div>
    </div>
  );
};
