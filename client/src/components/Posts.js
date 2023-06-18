import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Posts.module.css";

import { PostsContext } from "../store/PostsProvider";

export default function Posts() {
  const posts = useContext(PostsContext);

  return (
    <div>
      <h2 className={classes.postsH2}>Posts</h2>
      {posts.map((post) => (
        <ul key={post.id}>
          <li className={classes.flex}>
            <h3>{post.title}</h3>
            <Link to={`/posts/${post._id}`}>
              <p>Read More...</p>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}
