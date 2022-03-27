import { Box, Button, TextField, Theme } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

const useStyle = makeStyles((theme: Theme) => ({
  textField: {
    backgroundColor: "white",
  },
}));

export const TweetInput = () => {
  const classes = useStyle();
  const [tweetMsg, setTweetMsg] = useState("");

  const sendTweet = () => {
    setTweetMsg("");
  };

  return (
    <>
      <form onSubmit={sendTweet}>
        <Box display={"flex"}>
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
