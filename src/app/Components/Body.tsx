import { PostContainer } from "./PostContainer";
import { Sidebar } from "./Sidebar";
import { SideIndex } from "./SideIndex";
import "../Styles/body.scss";

export const Body = () => {
  return (
    <div className="body">
      <Sidebar></Sidebar>
      <PostContainer></PostContainer>
      <SideIndex></SideIndex>
    </div>
  );
};
