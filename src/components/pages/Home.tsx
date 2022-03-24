import { Box, Center, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../router/Router";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: React.FC = () => {
  const { isSignedIn, currentUser, loading } = useContext(AuthContext);
  const history = useHistory();

  const onClickEdit = (id: number | undefined) =>
    history.push(`/home/${id}/edit`);
  const onClickTweet = () => history.push(`/home/tweet`);

  return (
    <>
      {/* Router.tsxのPrivateでloadingがfalseになってからHomeがレンダリングされるようにしているので、Home側でloadingがtrueにならない→localStrageに保存？ */}
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          {isSignedIn && currentUser ? (
            <>
              <Box
                w={{ base: "260px", md: "500px" }}
                h={"540px"}
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
                <Stack textAlign={"center"} my={3}>
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
                <Center>
                  <Box mr={5}>
                    <PrimaryButton onClick={() => onClickEdit(currentUser.id)}>
                      Edit
                    </PrimaryButton>
                  </Box>
                  <PrimaryButton onClick={onClickTweet}>Tweet</PrimaryButton>
                </Center>
              </Box>
            </>
          ) : (
            <h1>Not signed in</h1>
          )}
        </>
      )}
    </>
  );
};
