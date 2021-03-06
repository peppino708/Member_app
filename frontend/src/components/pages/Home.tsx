import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { FormControl, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../router/Router";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Home: React.FC = () => {
  const { isSignedIn, currentUser, loading } = useContext(AuthContext);
  const history = useHistory();

  const onClickEdit = (id: number | undefined) =>
    history.push(`/home/${id}/edit`);
  const onClickTweet = () => history.push(`/home/tweet`);
  const onClickMember = () => history.push("/home/user_management");

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          {isSignedIn && currentUser ? (
            <>
              <Box
                w={{ base: "300px", md: "500px" }}
                h={{ base: "520px", md: "580px" }}
                bg="white"
                borderRadius="10px"
                shadow="md"
                p={4}
                overflow={"auto"}
              >
                <Heading as="h2" size="lg" textAlign="center">
                  Mypage
                </Heading>
                <Divider my={4} />
                <Image
                  objectFit={"cover"}
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
                  <Box mr={5}>
                    <PrimaryButton onClick={onClickTweet}>Tweet</PrimaryButton>
                  </Box>
                  <PrimaryButton onClick={onClickMember}>Member</PrimaryButton>
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
