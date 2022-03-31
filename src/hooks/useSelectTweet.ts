import { useCallback, useState } from "react";
import { Post } from "../interfaces/index";

type Props = {
  id: number;
  posts: Array<Post>;
  onOpen: () => void;
};

//選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectTweet = () => {
  const [selectedTweet, setSelectedTweet] = useState<Post | null>(null);

  const onSelectTweet = useCallback((props: Props) => {
    const { posts, id, onOpen } = props;
    const targetTweet = posts.find((post) => post.id === id);
    setSelectedTweet(targetTweet!); //!:undefinedの可能性がないよと伝えている
    onOpen();
  }, []);
  return { onSelectTweet, selectedTweet };
};
