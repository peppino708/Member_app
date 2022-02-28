/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { Link, useHistory } from "react-router-dom";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  //不要な再レンダリングが起こらないようにuseCallBackでラップする
  const onClickHome = useCallback(() => history.push("/home"), []);
  const onClickUserManagement = useCallback(
    () => history.push("/home/user_management"),
    []
  );
  const onClickSetting = useCallback(() => history.push("/home/setting"), []);
  const onClickLogout = useCallback(() => history.push("/"), []);

  return (
    <>
      <Flex
        as="nav"
        bg="purple.400"
        color="gray.50"
        align="ceter"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            Member App
          </Heading>
        </Flex>
        <Flex
          align="ceter"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4} _hover={{ textDecoration: "underline" }}>
            <Link to="/home/user_management">メンバー</Link>
          </Box>
          <Box pr={4} _hover={{ textDecoration: "underline" }}>
            <Link to="/home/setting">Tweet</Link>
          </Box>
          <Box pr={4} _hover={{ textDecoration: "underline" }}>
            <Link to="/">ログアウト</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
        onClickLogout={onClickLogout}
      />
    </>
  );
});
