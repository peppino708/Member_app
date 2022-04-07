import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
//chakraui使う時はルートのコンポーネントでChakraProviderで囲う
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import { Router } from "./router/Router";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
