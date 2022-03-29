import { Box, Text } from "@chakra-ui/react";
import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
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

  const handleGetEditPost = async () => {
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
  };

  useEffect(() => {
    handleGetEditPost();
  });

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
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ opacity: 0.8, cursor: "pointer" }}
      // onClick={() => onClick(id)}
      overflow={"auto"}
    >
      <Text fontSize="2xl" color="gray.700" p={2} m={2}>
        {tweetContent}
      </Text>
      <Button onClick={onClickDelete}>
        <Delete />
      </Button>
    </Box>
  );
};
