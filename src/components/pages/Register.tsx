import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
import { useRegister } from "../../hooks/useRegister";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { BsCamera } from "react-icons/bs";

export const Register: VFC = memo(() => {
  const { register, loading } = useRegister();
  const { showMessage } = useMessage();

  const [userName, setUserName] = useState("");
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);

  const [nickname, setNickname] = useState("");
  const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const [hobbies, setHobbies] = useState("");
  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);

  const [recentImage, setRecentImage] = useState("");
  const onChangeRecentImage = (e: ChangeEvent<HTMLInputElement>) =>
    setRecentImage(e.target.value);

  const onClickRegister = () =>
    register(userName, nickname, hobbies, recentImage);

  const history = useHistory();

  const onClickLoginBack = () => history.push("/");

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        hobbies === "" ||
        userName === "" ||
        nickname === "" ||
        recentImage === ""
      ) {
        showMessage({
          title: "入力されていない項目があります",
          status: "error",
        });
      } else {
        e.preventDefault();
        onClickRegister();
      }
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" my={10}>
      <Box
        bg="white"
        w={{ base: "sm", md: "md", lg: "lg" }}
        p={4}
        borderRadius="md"
      >
        <Heading as="h1" size="lg" textAlign="center">
          Member App
        </Heading>
        <Divider mt={4} mb={2} />
        {/* stackは囲った中の要素を等間隔に配置していく */}
        <Image
          borderRadius="full"
          boxSize="160px"
          src={"https://source.unsplash.com/random"}
          alt={nickname}
          mx="auto"
          my={4}
        />
        <Center>
          <Button leftIcon={<BsCamera />}>Upload</Button>
        </Center>
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="名前"
            value={userName}
            onChange={onChangeUserName}
            onKeyPress={onKeyPress}
            maxLength={10}
          />
          <Input
            placeholder="ニックネーム"
            value={nickname}
            onChange={onChangeNickName}
            onKeyPress={onKeyPress}
            maxLength={10}
          />
          <Input
            placeholder="趣味"
            value={hobbies}
            onChange={onChangeHobbies}
            onKeyPress={onKeyPress}
          />
          <Input
            placeholder="最近のできごと"
            value={recentImage}
            onChange={onChangeRecentImage}
            onKeyPress={onKeyPress}
          />
          <PrimaryButton
            disabled={
              hobbies === "" ||
              userName === "" ||
              nickname === "" ||
              recentImage === ""
            }
            loading={loading}
            onClick={onClickRegister}
          >
            新規登録
          </PrimaryButton>
          <Divider my={4} />
          <PrimaryButton onClick={onClickLoginBack}>戻る</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
