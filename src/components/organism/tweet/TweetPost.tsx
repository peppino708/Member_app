import { Box, Button, Text, WrapItem } from "@chakra-ui/react";
import { Edit } from "@material-ui/icons";
import { VFC } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  post: string;
  id: number;
}

export const TweetPost: VFC<Props> = (props) => {
  const { post, id } = props;
  const history = useHistory();

  const onClickEdit = () => history.push(`/home/${id}/tweet_edit`);

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
        <Button onClick={onClickEdit}>
          <Edit />
        </Button>
      </Box>
    </WrapItem>
  );
};
