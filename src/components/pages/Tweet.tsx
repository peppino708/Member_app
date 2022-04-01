/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Spinner, useDisclosure, Wrap } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllPosts } from "../../hooks/useAllPosts";
import { TweetPost } from "../organism/tweet/TweetPost";
import { TweetInput } from "../organism/tweet/TweetInput";
import { useSelectTweet } from "../../hooks/useSelectTweet";
import { TweetCommentModal } from "../organism/tweet/TweetCommentModal";

export const Tweet: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getPosts, loading, posts } = useAllPosts();
  const { selectedTweet, onSelectTweet } = useSelectTweet();

  useEffect(() => getPosts(), []);

  const onClickTweet = useCallback(
    (id: number) => {
      onSelectTweet({ id, posts, onOpen });
    },
    [posts, onSelectTweet, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <TweetInput />
          <Wrap p={{ base: 4, md: 10 }} justify="space-around">
            {posts.map((post) => (
              <TweetPost
                key={post.id}
                post={post.content}
                id={post.id}
                userId={post.userId}
                onClick={onClickTweet}
              />
            ))}
          </Wrap>
        </>
      )}
      <TweetCommentModal
        tweetId={selectedTweet?.id}
        post={selectedTweet}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
