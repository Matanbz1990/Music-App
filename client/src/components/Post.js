import React, { useContext } from "react";
import classes from "./Post.module.css";
import { useParams } from "react-router-dom";
import { PostsContext } from "../store/PostsProvider";

export default function Post() {
  const { postId } = useParams();
  const posts = useContext(PostsContext);

  const post = posts.find((post) => post._id === postId);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <h3>{post.author}</h3>
      <p className={classes.content}>{post.content}</p>
      {/* Additional post details */}
    </div>
  );
}
