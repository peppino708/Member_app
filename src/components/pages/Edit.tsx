/* eslint-disable react-hooks/exhaustive-deps */
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
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React, {
  ChangeEvent,
  memo,
  useContext,
  useEffect,
  useState,
  VFC,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { BsCamera } from "react-icons/bs";
import {
  FormControl,
  IconButton,
  InputLabel,
  TextField,
} from "@material-ui/core";
import Input from "@material-ui/core/Input";

import { useUpadate } from "../../hooks/useUpadate";
import { User } from "../../interfaces/index";
import { useMessage } from "../../hooks/useMessage";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AuthContext } from "../../router/Router";
import client from "../../lib/api/client";

type Member = {
  id: string | undefined;
};

export const Edit: VFC = memo(() => {
  const history = useHistory();
  const { update, loading, setLoading } = useUpadate();
  const { id } = useParams<Member>();
  const { showMessage } = useMessage();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const { setCurrentUser } = useContext(AuthContext);

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [recentTopic, setRecentTopic] = useState("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [loadingUser, setLoadingUser] = useState(false);

  const handleGetEditUser = async () => {
    setLoadingUser(true);
    try {
      const res = await client.get<User>(`auth/members/${id}`);

      const member = res.data;

      setProfileImage(member.image.url ?? "");
      setNickname(member.nickname ?? "");
      setName(member.name ?? "");
      setHobbies(member.hobbies ?? "");
      setRecentTopic(member.recentTopic ?? "");
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingUser(false);
    }
  };

  //cleanUp関数でunmount時のメモリーリークを防止する→合ってる？
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleGetEditUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);
  const onChangeRecentTopic = (e: ChangeEvent<HTMLInputElement>) =>
    setRecentTopic(e.target.value);

  const profileImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setLoading(true);

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("member[image]", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await client.patch(
        `auth/members/${id}`,
        formData,
        config
      );

      setProfileImage(data.image.url);
      setCurrentUser(data);
      setLoading(false);
      showMessage({ title: "アップロード完了", status: "success" });

      // dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      showMessage({ title: "アップロードに失敗しました", status: "error" });
      setLoading(false);
    }
  };

  const onClickUpdate = () => {
    update(id, name, nickname, hobbies, recentTopic);
    history.push("/home/user_management");
  };

  const onClickDelete = () => {
    client
      .delete(`/auth/members/${id}`)
      .then(() => {
        onClose();
        history.push("/home/user_management");
        showMessage({ title: "削除しました", status: "success" });
      })
      .catch((e) => {
        console.log(e);
        showMessage({ title: "削除できません", status: "error" });
      });
  };

  return (
    <>
      {loadingUser ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Flex align="center" justify="center" height="100vh" mb={10}>
          <Box bg="white" w="sm" p={4} borderRadius="md">
            <Heading as="h2" size="lg" textAlign="center">
              Edit Member
            </Heading>
            <Divider my={4} />
            <Image
              borderRadius="full"
              boxSize="160px"
              src={
                profileImage
                  ? profileImage
                  : "https://res.cloudinary.com/dfw3mlaic/image/upload/v1/images/unknown_ffqtxf"
              }
              alt={nickname}
              mx="auto"
              my={4}
            />
            <Center mb={4}>
              <InputLabel htmlFor="profile-image">
                <Input
                  id="profile-image"
                  type="file"
                  name="profile-image"
                  style={{ display: "none" }}
                  onChange={profileImageHandler}
                />

                <IconButton
                  style={{
                    backgroundColor: "#f50057",
                  }}
                  component="span"
                >
                  <BsCamera
                    style={{
                      color: "#fff",
                    }}
                  />
                </IconButton>
              </InputLabel>
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
                  value={recentTopic}
                  onChange={onChangeRecentTopic}
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
      )}
    </>
  );
});
