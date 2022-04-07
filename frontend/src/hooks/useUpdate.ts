import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../interfaces/index";
import client from "../lib/api/client";
import { AuthContext } from "../router/Router";
import { useMessage } from "./useMessage";

export const useUpdate = () => {
  const { showMessage } = useMessage();
  const history = useHistory();
  const { setCurrentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const update = useCallback(
    (
      id: string | undefined,
      name: string,
      nickname: string,
      hobbies: string,
      recentTopic: string
    ) => {
      setLoading(true);

      client
        .patch<User>(`auth/members/${id}`, {
          name: name,
          nickname: nickname,
          hobbies: hobbies,
          recent_topic: recentTopic,
        })
        .then((res) => {
          setCurrentUser(res.data);
          showMessage({ title: "更新しました", status: "success" });
          history.push("/home/user_management");
        })
        .catch(() => showMessage({ title: "更新できません", status: "error" }))
        .finally(() => setLoading(false));
    },
    [history, showMessage, setCurrentUser]
  );
  return { update, loading, setLoading };
};
