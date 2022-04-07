import { extendTheme } from "@chakra-ui/react";

//グローバルなスタイルを設定する:extendTheme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.800",
      },
    },
  },
});

export default theme;
