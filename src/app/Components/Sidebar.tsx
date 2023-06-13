import "../Styles/sidebar.scss";
import Image from "next/image";
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile_top">
        <Image
          className="profile_image"
          src="/images/profile2.jpg"
          width={200}
          height={200}
          alt="profile"
        />
      </div>
      <div className="profile_text">
        <h1 className="profile_name">Russ</h1>
        <h5 className="profile_social">
          BLOG : 
          <a className="profile_social_notion" href="https://binsspace.notion.site/Bin-s-Space-1ebe0875dc7442cc91f7e1defc3802ab">
            Notion
          </a>
        </h5>
        <h5 className="profile_email">
          EMAIL :yunsubin481@gmail.com
        </h5>
        <h5 className="profile_social">
          POSITION : Frontend
        </h5>
        <h5 className="profile_workplace">
          Workplace :<a href="https://www.mobytec.co.kr">Mobytech</a>
        </h5>
        {/*TODO:
         */}
      </div>
      <div className="profile_interests">
        <h3>CATEGORY</h3>
        <div>category_1</div>
        <div>category_2</div>
        <div>category_3</div>
      </div>
    </div>
  );
};
