import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import axios from "axios";
import React, { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUpadate } from "../../hooks/useUpadate";
import { User } from "../../types/api/user";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type Props = {};

type Member = {
  id: string | undefined;
};

export const Edit: VFC<Props> = memo(() => {
  const history = useHistory();
  const { update, loading } = useUpadate();
  const { id } = useParams<Member>();

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [recentImage, setRecentImage] = useState("");

  useEffect(() => {
    axios
      .get<User>(`http://localhost:3000/api/v1/members/${id}`)
      .then((res) => {
        const member = res.data;
        setNickname(member.nick_name ?? "");
        setName(member.name ?? "");
        setHobbies(member.hobbies ?? "");
        setRecentImage(member.recent_image ?? "");
      })
      .catch((e) => console.log(e));
  }, [id]);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);
  const onChangeRecentImage = (e: ChangeEvent<HTMLInputElement>) =>
    setRecentImage(e.target.value);

  const onClickUpdate = () => {
    update(id, name, nickname, hobbies, recentImage);
    history.push("/home/user_management");
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const onClickDelete = () => {
    axios
      .delete(`http://localhost:3000/api/v1/members/${id}`)
      .then(() => {
        onClose();
        history.push("/home/user_management");
      })
      .catch((e) => console.log(e));
  };

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
                onChange={onChangeName}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <FormLabel>ニックネーム</FormLabel>
              <Input
                value={nickname}
                onChange={onChangeNickname}
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
              <FormLabel>最近のできごと</FormLabel>
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
              onClick={() => setIsOpen(true)}
            >
              削除
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Member
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={onClickDelete} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
