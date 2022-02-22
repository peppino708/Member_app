import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";

export const useRegister = () => {
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
          history.push("/home");
        })
        .catch(() => alert("新規登録できません"))
        .finally(() => setLoading(false));
    },
    [history]
  );
  return { register, loading };
};
