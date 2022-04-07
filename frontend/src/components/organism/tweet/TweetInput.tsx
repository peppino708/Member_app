import { Box, Button, TextField, Theme } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useContext, useState } from "react";
import { useMessage } from "../../../hooks/useMessage";
import { Post } from "../../../interfaces";
import client from "../../../lib/api/client";
import { AuthContext } from "../../../router/Router";

const useStyle = makeStyles((theme: Theme) => ({
  textField: {
    backgroundColor: "white",
  },
}));

export const TweetInput = () => {
  const classes = useStyle();
  const { currentUser } = useContext(AuthContext);
  const { showMessage } = useMessage();

  const [tweetMsg, setTweetMsg] = useState("");

  const sendTweet = () => {
    client
      .post<Post>("auth/posts/", {
        content: tweetMsg,
        userId: currentUser?.id,
      })
      .then(() => {
        showMessage({ title: "ツイートしました", status: "success" });
      })
      .catch(() =>
        showMessage({ title: "ツイートできません", status: "error" })
      );
    setTweetMsg("");
  };

  return (
    <>
      <form onSubmit={sendTweet}>
        <Box display={"flex"} px={{ base: 4, md: 8 }}>
          <TextField
            style={{ marginRight: 20 }}
            variant="outlined"
            fullWidth
            label="What's happing?"
            className={classes.textField}
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!tweetMsg}
            style={{ borderRadius: "100%" }}
            variant="contained"
            color="primary"
          >
            <Send />
          </Button>
        </Box>
      </form>
    </>
  );
};
