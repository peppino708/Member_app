import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useRegister = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const register = useCallback(
    (
      userName: string,
      nickname: string,
      hobbies: string,
      recentImage: string
    ) => {
      setLoading(true);

      axios
        .post<User>("http://localhost:3000/api/v1/members", {
          name: userName,
          nick_name: nickname,
          hobbies: hobbies,
          recent_image: recentImage,
        })
        .then((res) => {
          console.log(res.data);
          showMessage({ title: "新規登録しました", status: "success" });
          history.push("/home/user_management");
        })
        .catch(() =>
          showMessage({ title: "新規登録できません", status: "error" })
        )
        .finally(() => setLoading(false));
    },
    [history, showMessage]
  );
  return { register, loading };
};
