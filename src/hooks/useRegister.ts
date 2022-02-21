import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";

export const useRegister = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const register = useCallback(() => {
    setLoading(true);

    axios
      .post<User>(`http://localhost:3000/api/v1/members`)
      .then((res) => {
        if (res.data) {
          history.push("/home");
        } else {
          alert("ユーザーが見つかりません");
        }
      })
      .catch(() => alert("ログインできません"))
      .finally(() => setLoading(false));
  }, [history]);
  return { register, loading };
};
