import { useCallback, useState } from "react";
import { User } from "../types/api/user";

type Props = {
  id: number;
  users: Array<User>;
  onOpen: () => void;
};

//選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { users, id, onOpen } = props;
    const targetUser = users.find((user) => user.id === id);
    //find:配列に対して使えるメソッド。条件に一致する最初の要素を返してくれる
    // setSelectedUser(targetUser ?? null); もしもtargetUserがundefinedだったら、nullを設定する
    setSelectedUser(targetUser!); //!:undefinedの可能性がないよと伝えている
    onOpen();
  }, []);
  return { onSelectUser, selectedUser };
};
