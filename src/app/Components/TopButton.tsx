import "../Styles/side_index.scss";
export function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button id="top" onClick={scrollToTop} type="button">
      Top
    </button>
  );
}
