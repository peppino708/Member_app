import {
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Post } from "../../../interfaces/index";
import { Box, Button, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";

//idバケツリレーになってしまっている？globalなstateで管理する?
interface Props {
  id: number | undefined;
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

// interface COMMENT {
//   id: string;
//   text: string;
//   timestamp: any;
// }

export const TweetCommentModal: VFC<Props> = memo((props) => {
  const { post, isOpen, onClose, id = undefined } = props;
  // const history = useHistory();
  // const { currentUser } = useContext(AuthContext);

  const [tweetContent, setTweetContent] = useState("");
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState<COMMENT[]>([
  //   {
  //     id: "",
  //     text: "",
  //     timestamp: null,
  //   },
  // ]);

  useEffect(() => {
    setTweetContent(post?.content ?? "");
  }, [post]);

  // const onClickEdit = (id: number | undefined) =>
  //   history.push(`/home/${id}/edit`);

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
            <Text fontSize="xl">ねむこちゃんです！</Text>
            <Divider />
          </Stack>
        </ModalBody>
        <ModalFooter>
          {/* <form onSubmit={sendTweet}> */}
          <Box display={"flex"} px={{ base: 4, md: 8 }}>
            <TextField
              style={{ marginRight: 20 }}
              variant="outlined"
              fullWidth
              label="Add comments?"
              // className={classes.textField}
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
          {/* </form> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
