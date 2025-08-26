import { createContext, useContext, useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const response = await getAllPosts();
      setPostList(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <PostContext.Provider value={{ postList, setPostList, isLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
