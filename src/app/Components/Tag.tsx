import "../Styles/tag.scss";

interface TagProps {
  name: string;
}

export const Tag = ({ name }: TagProps) => {
  return <span className="tag">{name}</span>;
};
