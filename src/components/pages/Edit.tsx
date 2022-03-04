import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BsCamera } from "react-icons/bs";

import { useUpadate } from "../../hooks/useUpadate";
import { User } from "../../types/api/user";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { FormControl, TextField } from "@material-ui/core";

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
      <Flex align="center" justify="center" height="100vh" my={10}>
        <Box bg="white" w="sm" p={4} borderRadius="md">
          <Heading as="h2" size="lg" textAlign="center">
            Edit Member
          </Heading>
          <Divider my={4} />
          <Image
            borderRadius="full"
            boxSize="160px"
            src={
              "https://res.cloudinary.com/dfw3mlaic/image/upload/v1/images/unknown_ffqtxf"
            }
            alt={nickname}
            mx="auto"
            my={4}
          />
          <Center mb={4}>
            <Button size={"sm"} leftIcon={<BsCamera />}>
              Upload
            </Button>
          </Center>
          <Stack spacing={4}>
            <FormControl>
              <TextField
                autoFocus
                label="名前"
                variant="outlined"
                value={name}
                onChange={onChangeName}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="ニックネーム"
                variant="outlined"
                value={nickname}
                onChange={onChangeNickname}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="趣味"
                variant="outlined"
                value={hobbies}
                onChange={onChangeHobbies}
                // isReadOnly={!isAdmin}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="最近のできごと"
                variant="outlined"
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
