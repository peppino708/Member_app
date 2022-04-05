import {
  Center,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useContext, useEffect, useState, VFC } from "react";
import { Comment, Post } from "../../../interfaces/index";
import { Box, Button, TextField } from "@material-ui/core";
import { Delete, Send } from "@material-ui/icons";
import client from "../../../lib/api/client";
import { AuthContext } from "../../../router/Router";
import { useMessage } from "../../../hooks/useMessage";

interface Props {
  comments: Comment[] | null;
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

export const TweetCommentModal: VFC<Props> = memo((props) => {
  const { post, isOpen, onClose, comments, loading } = props;
  // const history = useHistory();
  const { showMessage } = useMessage();
  const { currentUser } = useContext(AuthContext);

  const [tweetContent, setTweetContent] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setTweetContent(post?.content ?? "");
  }, [post]);

  const sendComment = () => {
    client
      .post<Comment>(`auth/posts/${post?.id}/comments`, {
        content: comment,
        userId: currentUser?.id,
      })
      .then(() => {
        showMessage({ title: "コメントしました", status: "success" });
      })
      .catch(() =>
        showMessage({ title: "コメントできません", status: "error" })
      );
    setComment("");
  };

  const onClickDeleteComment = (commentId: number) => {
    client
      .delete(`/auth/posts/${post?.id}/comments/${commentId}`)
      .then(() => {
        showMessage({ title: "削除しました", status: "success" });
        onClose();
      })
      .catch((e) => {
        console.log(e);
        showMessage({ title: "削除できません", status: "error" });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>Tweet Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <Heading as="h5" size="sm">
              Tweet
            </Heading>
            <Text fontSize="xl">{tweetContent}</Text>
            <Divider />
            <Heading as="h5" size="sm">
              Comment
            </Heading>
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              comments &&
              comments.map((comment) => (
                <Box display="flex">
                  <Text fontSize="xl" key={comment.id}>
                    {comment.content}
                  </Text>
                  {currentUser?.id === comment.userId && (
                    <Button onClick={() => onClickDeleteComment(comment.id)}>
                      <Delete />
                    </Button>
                  )}
                </Box>
              ))
            )}
            <Divider />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <form onSubmit={sendComment}>
            <Box display={"flex"} px={{ base: 4, md: 8 }}>
              <TextField
                style={{ marginRight: 20 }}
                variant="outlined"
                fullWidth
                label="Add new comments?"
                value={comment}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
              />
              <Button
                type="submit"
                disabled={!comment}
                style={{ borderRadius: "100%" }}
                variant="contained"
                color="primary"
              >
                <Send />
              </Button>
            </Box>
          </form>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
