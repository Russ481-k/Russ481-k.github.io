import React from "react";
import Post from "../Posts/Post";
import "../Styles/post_container.scss"


export const PostContainer = () => {
  const posts = [
    {
      id: 1,
      title: "My First Post",
      content: `This is my first blog post. I'm excited to start writing about my favorite things, like web development and learning new technologies.`,
    },
    {
      id: 2,
      title: "My Second Post",
      content: `This is my second blog post. I'm still learning, but I'm having a lot of fun.`,
    },
    {
      id: 3,
      title: "My First Post",
      content: `This is my first blog post. I'm excited to start writing about my favorite things, like web development and learning new technologies.`,
    },
    {
      id: 4,
      title: "My Second Post",
      content: `This is my second blog post. I'm still learning, but I'm having a lot of fun.`,
    },
    {
      id: 5,
      title: "My First Post",
      content: `This is my first blog post. I'm excited to start writing about my favorite things, like web development and learning new technologies.`,
    },
    {
      id: 6,
      title: "My Second Post",
      content: `This is my second blog post. I'm still learning, but I'm having a lot of fun.`,
    },
    {
      id: 7,
      title: "My First Post",
      content: `This is my first blog post. I'm excited to start writing about my favorite things, like web development and learning new technologies.`,
    },
    {
      id: 8,
      title: "My Second Post",
      content: `This is my second blog post. I'm still learning, but I'm having a lot of fun.`,
    },
    {
      id: 9,
      title: "My First Post",
      content: `This is my first blog post. I'm excited to start writing about my favorite things, like web development and learning new technologies.`,
    },
    {
      id: 10,
      title: "My Second Post",
      content: `This is my second blog post. I'm still learning, but I'm having a lot of fun.`,
    },

  ];

  return (
    <div className="post_container">
      <h1>PostContainer</h1>
      {posts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  // 게시물 데이터들을 가져옵니다.
  // 로컬에 있는 마크다운 파일을 가져오는 getAllPosts 과정은 이후에 설명하겠습니다.
  // const posts = getAllPosts(['slug', 'title', 'date']);

  // getStaticProps에서 반환하는 객체는 페이지 컴포넌트의 props로 넘어갑니다.                                  
  return {
    props: {
      // posts,
    },
  };
}