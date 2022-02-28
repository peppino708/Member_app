import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";

export const Setting: VFC = memo(() => {
  return (
    <Flex justify={"center"} align={"center"} height={"100vh"}>
      <Box
        w={{ base: "md", md: "lg" }}
        h={{ base: "md", md: "lg" }}
        bg="white"
        borderRadius="10px"
        shadow="md"
        p={4}
        overflow={"auto"}
      >
        <Stack pl={4}>
          <Text textAlign={"center"} fontSize="5xl" fontWeight="bold" mb={4}>
            Tweet
          </Text>
          <Text fontSize="2xl" color="gray">
            Membr.comの移行作業が大変だな〜
          </Text>
          <Text fontSize="2xl" color="gray">
            大学4年生が辞めちゃうの寂しいな
          </Text>
          <Text fontSize="2xl" color="gray">
            素晴らしいバイトです
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
});
