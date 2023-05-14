import React from 'react';
// import "../Styles/post.scss"

const Post = ({ title, content }:any ) => {
  return (
    <div className='post'>
      <div title={title} />
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Post;