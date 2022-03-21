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
import { ChangeEvent, memo, useContext, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../../interfaces/index";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { FormControl, TextField } from "@material-ui/core";
import { AuthContext } from "../../../router/Router";

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
  const { currentUser } = useContext(AuthContext);

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [recentTopic, setRecentTopic] = useState("");

  useEffect(() => {
    setNickname(user?.nickname ?? "");
    setName(user?.name ?? "");
    setHobbies(user?.hobbies ?? "");
    setRecentTopic(user?.recentTopic ?? "");
  }, [user]);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);
  const onChangeRecentImage = (e: ChangeEvent<HTMLInputElement>) =>
    setRecentTopic(e.target.value);

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
                value={recentTopic}
                onChange={onChangeRecentImage}
                inputProps={{ readOnly: true }}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        {/* current_userと一致の場合のみ編集ボタンを出すようにする */}
        {currentUser?.id === id && (
          <ModalFooter>
            <PrimaryButton onClick={() => onClickEdit(id)}>編集</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});
