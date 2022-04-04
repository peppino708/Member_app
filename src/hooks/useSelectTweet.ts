import { useCallback, useState } from "react";
import { Post, Comment } from "../interfaces/index";
import client from "../lib/api/client";

type Props = {
  id: number;
  posts: Array<Post>;
  onOpen: () => void;
};

//選択したツイート情報とそれに紐づくコメントを特定しモーダルを表示するカスタムフック
export const useSelectTweet = () => {
  const [selectedTweet, setSelectedTweet] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const onSelectTweet = useCallback((props: Props) => {
    const { posts, id, onOpen } = props;
    const targetTweet = posts.find((post) => post.id === id);
    setSelectedTweet(targetTweet!); //!:undefinedの可能性がないよと伝えている
    const getComments = () => {
      setLoadingComments(true);
      client
        .get<Array<Comment>>(`auth/posts/${id}/comments`)
        .then((res) => setComments(res.data))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoadingComments(false);
        });
    };
    getComments();
    onOpen();
  }, []);
  return { onSelectTweet, selectedTweet, comments, loadingComments };
};
