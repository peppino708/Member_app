import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { FormControl, TextField } from "@material-ui/core";

//idバケツリレーになってしまっている？globalなstateで管理する?
type Props = {
  id: number | undefined;
  user: User | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const UserDetailModal: VFC<Props> = memo((props) => {
  const { user, isOpen, onClose, id = undefined } = props;
  const history = useHistory();

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [recentImage, setRecentImage] = useState("");

  useEffect(() => {
    setNickname(user?.nick_name ?? "");
    setName(user?.name ?? "");
    setHobbies(user?.hobbies ?? "");
    setRecentImage(user?.recent_image ?? "");
  }, [user]);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);
  const onChangeRecentImage = (e: ChangeEvent<HTMLInputElement>) =>
    setRecentImage(e.target.value);

  const onClickEdit = (id: number | undefined) =>
    history.push(`/home/${id}/edit`);

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>Member Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <TextField
                margin="normal"
                label="名前"
                variant="outlined"
                value={name}
                onChange={onChangeName}
                inputProps={{ readOnly: true }}
              />
            </FormControl>
            <FormControl>
              <TextField
                margin="normal"
                label="ニックネーム"
                variant="outlined"
                value={nickname}
                onChange={onChangeNickname}
                inputProps={{ readOnly: true }}
              />
            </FormControl>
            <FormControl>
              <TextField
                margin="normal"
                label="趣味"
                variant="outlined"
                value={hobbies}
                onChange={onChangeHobbies}
                inputProps={{ readOnly: true }}
              />
            </FormControl>
            <FormControl>
              <TextField
                margin="normal"
                label="最近のできごと"
                variant="outlined"
                value={recentImage}
                onChange={onChangeRecentImage}
                inputProps={{ readOnly: true }}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        {/* current_userと一致の場合のみ編集ボタンを出すようにする */}
        {/* {isAdmin && ( */}
        <ModalFooter>
          <PrimaryButton onClick={() => onClickEdit(id)}>編集</PrimaryButton>
        </ModalFooter>
        {/* )} */}
      </ModalContent>
    </Modal>
  );
});
