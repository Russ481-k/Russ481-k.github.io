import "../Styles/tag.scss";

interface TagProps {
  name: string;
  onClick?: (tag: string) => void;
}

export const Tag = ({ name, onClick }: TagProps) => {
  return (
    <span
      className={`tag ${onClick ? "clickable" : ""}`}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick(name);
        }
      }}
    >
      {name}
    </span>
  );
};
