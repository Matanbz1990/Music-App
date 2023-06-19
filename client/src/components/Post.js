import React, { useContext } from "react";
import classes from "./Post.module.css";
import { useParams } from "react-router-dom";
import { PostsContext } from "../store/PostsProvider";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Pro from "../assets/images/Pro.png";
import loading from "../assets/images/loading.png";

export default function Post() {
  const { postId } = useParams();
  const posts = useContext(PostsContext);

  const post = posts.find((post) => post._id === postId);

  if (!post) {
    return <div>Loading...</div>;
  }

  const paragraphs = post.content.split("\n\n");
  const imgStyle = {
    margin: "auto",
    width: "20rem",
  };
  return (
    <div>
      <Link to={"/posts"} className={classes.link}>
        <ArrowLeftOutlined />
        Back to posts
      </Link>

      <div className={classes.titleAndAuthor}>
        <h1>{post.title}</h1>
        <h3>{post.author}</h3>
      </div>
      <article>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={classes.content}>
            {paragraph}
          </p>
        ))}
        <img
          style={imgStyle}
          alt="profileImage"
          data-src={Pro}
          width="400"
          src={loading}
          className="lazyload"
        />
      </article>
    </div>
  );
}
