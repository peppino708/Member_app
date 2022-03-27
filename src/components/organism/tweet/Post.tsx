import { Box, Text, WrapItem } from "@chakra-ui/react";
import React, { VFC } from "react";

interface Props {
  post: string;
}

export const Post: VFC<Props> = (props) => {
  const { post } = props;
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
      </Box>
    </WrapItem>
  );
};
