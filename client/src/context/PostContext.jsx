import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const usePosts = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const generateRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://kisaan-bazar.onrender.com/api/posts/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const postsWithDates = response.data.map(post => ({
        ...post,
        createdAt: generateRandomDate(new Date(2024, 0, 1), new Date()),
        dealDuration: Math.floor(Math.random() * 6) + 1,
      }));
      setPosts(postsWithDates);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    posts,
    loading,
    fetchPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}; 