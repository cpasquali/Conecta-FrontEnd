import { createContext, useContext, useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [postList, setPostList] = useState([]);

  const fetchPost = async () => {
    const response = await getAllPosts();
    setPostList(response);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <PostContext.Provider value={{ postList, setPostList }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
