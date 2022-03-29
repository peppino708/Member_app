/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Spinner, Wrap } from "@chakra-ui/react";
import { memo, useEffect, VFC } from "react";
import { useAllPosts } from "../../hooks/useAllPosts";
import { TweetPost } from "../organism/tweet/TweetPost";
import { TweetInput } from "../organism/tweet/TweetInput";

export const Tweet: VFC = memo(() => {
  const { getPosts, loading, posts } = useAllPosts();

  useEffect(() => getPosts(), []);

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
              <TweetPost key={post.id} post={post.content} id={post.id} />
            ))}
          </Wrap>
        </>
      )}
    </>
  );
});
