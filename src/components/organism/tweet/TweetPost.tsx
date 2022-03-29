import { Box, Button, Text, WrapItem } from "@chakra-ui/react";
import { Edit } from "@material-ui/icons";
import { useContext, VFC } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../router/Router";

interface Props {
  post: string;
  id: number;
  userId: number;
}

export const TweetPost: VFC<Props> = (props) => {
  const { post, id, userId } = props;
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

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
        {currentUser?.id === userId && (
          <Button onClick={onClickEdit}>
            <Edit />
          </Button>
        )}
      </Box>
    </WrapItem>
  );
};
