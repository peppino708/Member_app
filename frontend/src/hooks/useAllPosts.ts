/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Post } from "../interfaces";
import client from "../lib/api/client";
import { useMessage } from "./useMessage";

export const useAllPosts = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Array<Post>>([]);

  const getPosts = useCallback(() => {
    setLoading(true);
    client
      .get<Array<Post>>("auth/posts")
      .then((res) => setPosts(res.data))
      .catch(() => {
        showMessage({ title: "Tweet取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { getPosts, loading, posts };
};
