import { useContext } from "react";
import {
  LoginUserContext,
  LoginUserContextType,
} from "../providers/LoginUserProvider";

//contextをカスタムフック化する
//useLoginUserを使うだけで、contextの値を参照できる
export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
