import { Image } from "@chakra-ui/react";
import React, { useContext } from "react";

import { AuthContext } from "../../router/Router";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <Image
            borderRadius="full"
            boxSize="160px"
            src={
              currentUser.image.url
                ? currentUser.image.url
                : "https://res.cloudinary.com/dfw3mlaic/image/upload/v1/images/unknown_ffqtxf"
            }
            m="auto"
          />
          <h2>Email: {currentUser?.email}</h2>
          <h2>Name: {currentUser?.name}</h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
};
