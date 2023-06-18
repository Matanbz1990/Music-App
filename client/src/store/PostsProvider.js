import React, { createContext, useState, useEffect } from "react";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from your server
    fetchPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  const fetchPosts = async () => {
    // Fetch posts from your server using fetch or axios
    const response = await fetch("http://localhost:4000/api/posts/getAll");

    const data = await response.json();
    return data.post;
  };

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };
