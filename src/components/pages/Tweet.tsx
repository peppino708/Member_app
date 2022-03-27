import { Wrap } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { Post } from "../organism/tweet/Post";
import { TweetInput } from "../organism/tweet/TweetInput";

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

export const Tweet: VFC = memo(() => {
  return (
    <>
      <TweetInput />
      <Wrap p={{ base: 4, md: 10 }} justify="space-around">
        {textArr.map((text, i) => (
          <Post key={i} text={text} />
        ))}
      </Wrap>
    </>
  );
});
