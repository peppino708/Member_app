import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();

  const [userId, setUserId] = useState("");
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onClickLogin = () => login(userId);

  const history = useHistory();

  const onClickRegister = () => history.push("/register");

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClickLogin();
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
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
            onKeyPress={onKeyPress}
          />
          <PrimaryButton
            disabled={userId === ""}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          <Divider my={4} />
          <PrimaryButton onClick={onClickRegister}>新規登録</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
