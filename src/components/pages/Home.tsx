import { Box, Center, Image, Spinner, Stack } from "@chakra-ui/react";
import { FormControl, TextField } from "@material-ui/core";
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
                h={{ base: "450px", md: "520px" }}
                bg="white"
                borderRadius="10px"
                shadow="md"
                p={4}
                overflow={"auto"}
              >
                <Image
                  borderRadius="full"
                  boxSize={{ base: "160px", md: "220px" }}
                  src={
                    currentUser.image.url
                      ? currentUser.image.url
                      : "https://res.cloudinary.com/dfw3mlaic/image/upload/v1/images/unknown_ffqtxf"
                  }
                  m="auto"
                />
                <Stack align={"center"} my={4}>
                  <FormControl>
                    <TextField
                      style={{ width: 250 }}
                      size="small"
                      margin="none"
                      label="名前"
                      variant="outlined"
                      value={currentUser.name}
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      style={{ width: 250 }}
                      size="small"
                      margin="none"
                      label="ニックネーム"
                      variant="outlined"
                      value={currentUser.nickname}
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      style={{ width: 250 }}
                      size="small"
                      margin="none"
                      label="趣味"
                      variant="outlined"
                      value={currentUser.hobbies}
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      style={{ width: 250 }}
                      size="small"
                      margin="none"
                      label="最近のできごと"
                      variant="outlined"
                      value={currentUser.recentTopic}
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
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
