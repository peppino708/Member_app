import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";

const textArr = [
  "Membr.comの移行作業が大変だな〜",
  "大学4年生が辞めちゃうの寂しいな",
  "素晴らしいバイトです",
  "バイトの倍率めちゃくちゃ高い",
  "新スタッフどんな子か早くみたい",
  "今日は1時間残業しました",
];

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
          {textArr.map((text) => {
            return (
              <Text fontSize="2xl" color="gray" shadow={"md"} p={2} m={2}>
                {text}
              </Text>
            );
          })}
        </Stack>
      </Box>
    </Flex>
  );
});
