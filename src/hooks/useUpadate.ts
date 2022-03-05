import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useUpadate = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const update = useCallback(
    (
      id: string | undefined,
      name: string,
      nickname: string,
      hobbies: string,
      recentImage: string
    ) => {
      setLoading(true);

      axios
        .patch<User>(`http://localhost:3000/api/v1/members/${id}`, {
          name: name,
          nick_name: nickname,
          hobbies: hobbies,
          recent_image: recentImage,
        })
        .then(() => {
          showMessage({ title: "更新しました", status: "success" });
          history.push("/home/user_management");
        })
        .catch(() => showMessage({ title: "更新できません", status: "error" }))
        .finally(() => setLoading(false));
    },
    [history, showMessage]
  );
  return { update, loading, setLoading };
};
