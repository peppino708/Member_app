import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useUpadate } from "../../hooks/useUpadate";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type Props = {};

export const Edit: VFC<Props> = memo((props) => {
  // const {} = props;
  const history = useHistory();
  const { update, loading } = useUpadate();
  //未完
  const { loginUser } = useLoginUser();
  console.log(loginUser?.name);

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [recentImage, setRecentImage] = useState("");

  //未完
  useEffect(() => {
    setNickname(loginUser?.nick_name ?? "");
    setName(loginUser?.name ?? "");
    setHobbies(loginUser?.hobbies ?? "");
    setRecentImage(loginUser?.recent_image ?? "");
  }, [loginUser]);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);
  const onChangeRecentImage = (e: ChangeEvent<HTMLInputElement>) =>
    setRecentImage(e.target.value);

  const onClickUpdate = () => {
    update(name, nickname, hobbies, recentImage);
    history.push("/home/edit");
  };

  const onClickDelete = () => alert("削除しますか？");

  return (
    <>
      <Flex align="center" justify="center" height="100vh" shadow="md">
        <Box bg="white" w="sm" p={4} borderRadius="md">
          <Heading as="h1" size="lg" textAlign="center">
            Member App
          </Heading>
          <Divider my={4} />
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input
                value={name}
                onChange={onChangeNickname}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <FormLabel>ニックネーム</FormLabel>
              <Input
                value={nickname}
                onChange={onChangeName}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <FormLabel>趣味</FormLabel>
              <Input
                value={hobbies}
                onChange={onChangeHobbies}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <FormLabel>最近の1枚</FormLabel>
              <Input
                value={recentImage}
                onChange={onChangeRecentImage}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <Divider my={4} />
            <PrimaryButton onClick={onClickUpdate} loading={loading}>
              更新
            </PrimaryButton>
            <Divider my={4} />
            <Button
              bg="red.400"
              color="white"
              _hover={{ opacity: 0.8 }}
              isLoading={loading}
              onClick={onClickDelete}
            >
              削除
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
