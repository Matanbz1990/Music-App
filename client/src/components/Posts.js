import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Posts.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PostsContext } from "../store/PostsProvider";

export default function Posts() {
  const posts = useContext(PostsContext);

  return (
    <div>
      <Link to={"/"} className={classes.link}>
        <ArrowLeftOutlined />
        Back to tracks
      </Link>
      <h1 className={classes.postsH2}>Music Posts</h1>
      {posts.map((post) => (
        <div className={classes.post} key={post.id}>
          <h2>"{post.title}"</h2>
          <h4>by {post.author}</h4>
          <PostPreview
            content={post.content}
            maxLength={200}
            key={post.id}
            className={classes.preview}
          />
          <Link to={`/posts/${post._id}`} className={classes.link}>
            <h3>Read More...</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

const PostPreview = ({ content, maxLength }) => {
  if (content.length <= maxLength) {
    // If the content is shorter than or equal to the maximum length, display it as is
    return <div>{content}</div>;
  }

  // If the content is longer than the maximum length, truncate it and add an ellipsis
  const truncatedContent = content.slice(0, maxLength) + "...";

  return <div>{truncatedContent}</div>;
};
