import { Box } from "@chakra-ui/react";
import { memo, VFC } from "react";

export const Home: VFC = memo(() => {
  return (
    <Box position={"relative"}>
      {/* <Image src={`${process.env.PUBLIC_URL}/Home-unsplash.jpg`}></Image> */}
    </Box>
  );
});
