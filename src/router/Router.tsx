import { Switch, Route, Redirect } from "react-router-dom";
import { createContext, memo, useEffect, useState, VFC } from "react";
import { Login } from "../components/pages/Login";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { Register } from "../components/pages/Register";
import SignUp from "../components/pages/SignUp";
import { User } from "../interfaces";
import SignIn from "../components/pages/SignIn";
import { getCurrentUser } from "../lib/api/auth";
import CommonLayout from "../components/layouts/CommonLayout";
import Home2 from "../components/pages/Home2";

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

export const Router: VFC = memo(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };
  return (
    <Switch>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <CommonLayout>
          <LoginUserProvider>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Private>
              <Route exact path="/" component={Home2} />
            </Private>
            <Route
              path="/home"
              render={({ match: { url } }) => (
                <Switch>
                  {homeRoutes.map((route) => (
                    <Route
                      key={route.path}
                      exact={route.exact}
                      path={`${url}${route.path}`}
                    >
                      <HeaderLayout>{route.children}</HeaderLayout>
                    </Route>
                  ))}
                </Switch>
              )}
            />
          </LoginUserProvider>
        </CommonLayout>
      </AuthContext.Provider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
