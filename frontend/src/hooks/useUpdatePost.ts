import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Post } from "../interfaces";
import client from "../lib/api/client";
import { useMessage } from "./useMessage";

export const useUpdatePost = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const updatePost = useCallback(
    (id: string | undefined, content: string | undefined) => {
      setLoading(true);

      client
        .patch<Post>(`auth/posts/${id}`, {
          content: content,
        })
        .then(() => {
          showMessage({ title: "更新しました", status: "success" });
          history.push("/home/tweet");
        })
        .catch(() => showMessage({ title: "更新できません", status: "error" }))
        .finally(() => setLoading(false));
    },
    [history, showMessage]
  );
  return { updatePost, loading, setLoading };
};
