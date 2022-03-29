import { Box, Button, Text, WrapItem } from "@chakra-ui/react";
import { Delete } from "@material-ui/icons";
import { VFC } from "react";
import { useMessage } from "../../../hooks/useMessage";
import client from "../../../lib/api/client";

interface Props {
  post: string;
  id: number;
}

export const Post: VFC<Props> = (props) => {
  const { post, id } = props;
  const { showMessage } = useMessage();

  const onClickDelete = () => {
    client
      .delete(`/auth/posts/${id}`)
      .then(() => {
        // onClose();
        showMessage({ title: "削除しました", status: "success" });
      })
      .catch((e) => {
        console.log(e);
        showMessage({ title: "削除できません", status: "error" });
      });
  };

  return (
    <WrapItem>
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
          {post}
        </Text>
        <Button onClick={onClickDelete}>
          <Delete />
        </Button>
      </Box>
    </WrapItem>
  );
};
