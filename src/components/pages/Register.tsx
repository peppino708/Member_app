import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Register: VFC = memo(() => {
  // const { login, loading } = useAuth();

  const [userName, setUserName] = useState("");
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);

  const [nickName, setNickName] = useState("");
  const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);

  const [hobbies, setHobbies] = useState("");
  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);

  const [recentPicture, setRecentPicture] = useState("");
  const onChangeRecentPicture = (e: ChangeEvent<HTMLInputElement>) =>
    setRecentPicture(e.target.value);

  const onClickRegister = () => {};

  const history = useHistory();

  const onClickLoginBack = () => history.push("/");

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClickRegister();
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" shadow="md">
      <Box bg="white" w="sm" p={4} borderRadius="md">
        <Heading as="h1" size="lg" textAlign="center">
          Member App
        </Heading>
        <Divider my={4} />
        {/* stackは囲った中の要素を等間隔に配置していく */}
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="名前"
            value={userName}
            onChange={onChangeUserName}
            onKeyPress={onKeyPress}
          />
          <Input
            placeholder="ニックネーム"
            value={nickName}
            onChange={onChangeNickName}
            onKeyPress={onKeyPress}
          />
          <Input
            placeholder="趣味"
            value={hobbies}
            onChange={onChangeHobbies}
            onKeyPress={onKeyPress}
          />
          <Input
            placeholder="最近の一枚"
            value={recentPicture}
            onChange={onChangeRecentPicture}
            onKeyPress={onKeyPress}
          />
          <PrimaryButton
            disabled={hobbies === ""}
            // loading={loading}
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
