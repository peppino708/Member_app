import { Box, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, VFC } from "react";

const textArr = [
  "Membr.comの移行作業が大変だな〜",
  "大学4年生が辞めちゃうの寂しいな",
  "素晴らしいバイトです",
  "バイトの倍率めちゃくちゃ高い",
  "新スタッフどんな子か早くみたい",
  "今日は1時間残業しました",
  "今日も１日お疲れ様でした！",
  "明日も元気に頑張りましょう！",
  "おはようごさいます！",
  "こんにちは！",
];

export const Setting: VFC = memo(() => {
  return (
    <Wrap p={{ base: 4, md: 10 }} justify="space-around">
      {textArr.map((text, i) => {
        return (
          <WrapItem key={i}>
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
                {text}
              </Text>
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );
});
