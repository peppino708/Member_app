import Cookies from "js-cookie";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "../lib/api/auth";
import { AuthContext } from "../router/Router";

export const useSignOut = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        history.push("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { handleSignOut };
};
