import { Box } from "@chakra-ui/react";
import { Button, TextField } from "@material-ui/core";
import { Delete, Send } from "@material-ui/icons";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import { Post } from "../../interfaces";
import client from "../../lib/api/client";

interface EditPost {
  id: string | undefined;
}

export const TweetEdit = () => {
  const [tweetContent, setTweetContent] = useState("");
  // const [loadingPost, setLoadingPost] = useState(false);

  const { id } = useParams<EditPost>();
  const history = useHistory();
  const { showMessage } = useMessage();
  const { updatePost } = useUpdatePost();

  const handleGetEditPost = useCallback(async () => {
    // setLoadingPost(true);
    try {
      const res = await client.get<Post>(`auth/posts/${id}`);

      const post = res.data;

      setTweetContent(post.content ?? "");
    } catch (e) {
      console.log(e);
    } finally {
      // setLoadingPost(false);
    }
  }, [id]);

  useEffect(() => {
    handleGetEditPost();
  }, [handleGetEditPost]);

  const onClickUpdate = () => {
    updatePost(id, tweetContent);
  };

  const onClickDelete = () => {
    client
      .delete(`/auth/posts/${id}`)
      .then(() => {
        // onClose();
        history.push("/home/tweet");
        showMessage({ title: "削除しました", status: "success" });
      })
      .catch((e) => {
        console.log(e);
        showMessage({ title: "削除できません", status: "error" });
      });
  };

  return (
    <Box
      w="270px"
      h="270px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ opacity: 0.8, cursor: "pointer" }}
      // onClick={() => onClick(id)}
      overflow={"auto"}
    >
      <TextField
        label="Edit Post"
        multiline
        fullWidth
        rows={8}
        value={tweetContent}
        variant="outlined"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTweetContent(e.target.value)
        }
      />
      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Button onClick={onClickDelete}>
          <Delete />
        </Button>
        <Button onClick={onClickUpdate}>
          <Send />
        </Button>
      </Box>
    </Box>
  );
};
