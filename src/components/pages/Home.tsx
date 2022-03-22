import { Box, Center, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import { AuthContext } from "../../router/Router";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: React.FC = () => {
  const { isSignedIn, currentUser, loading } = useContext(AuthContext);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          {loading ? (
            <Center h="100vh">
              <Spinner />
            </Center>
          ) : (
            <Box
              w={{ base: "260px", md: "500px" }}
              h={{ base: "400px", md: "500px" }}
              bg="white"
              borderRadius="10px"
              shadow="md"
              p={4}
              overflow={"auto"}
            >
              <Image
                borderRadius="full"
                boxSize={{ base: "160px", md: "250px" }}
                src={
                  currentUser.image.url
                    ? currentUser.image.url
                    : "https://res.cloudinary.com/dfw3mlaic/image/upload/v1/images/unknown_ffqtxf"
                }
                m="auto"
              />
              <Stack textAlign={"center"} mt={3}>
                <Text fontSize="lg" color="gray">
                  Email: {currentUser?.email}
                </Text>
                <Text fontSize="lg" color="gray">
                  Name: {currentUser?.name}
                </Text>
                <Text fontSize="lg" color="gray">
                  nickname: {currentUser?.nickname}
                </Text>
                <Text fontSize="lg" color="gray">
                  hobbies: {currentUser?.hobbies}
                </Text>
                <Text fontSize="lg" color="gray">
                  recentTopic: {currentUser?.recentTopic}
                </Text>
              </Stack>
            </Box>
          )}
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
};
