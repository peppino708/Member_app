import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { AuthContext } from "../../router/Router";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Inbox, Mail } from "@material-ui/icons";
import { useSignOut } from "../../hooks/useSignOut";

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textTransform: "none",
  },
}));

export const Header: React.FC = () => {
  const { loading, isSignedIn } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const { handleSignOut } = useSignOut();

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <Button
            color="inherit"
            className={classes.linkBtn}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        );
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign Up
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  const [state, setState] = useState(false);

  const toggleDrawer = () => {
    setState(!state);
  };

  const onClickHandler = (index: number) => {
    switch (index) {
      case 0:
        history.push("/home/user_management");
        break;
      case 1:
        history.push("/home/tweet");
        break;
      case 2:
        history.push("/home");
        break;
      default:
        return;
    }
  };

  const list = () => (
    <Box role="presentation" onClick={toggleDrawer}>
      <List>
        {["Member", "Tweet", "Mypage"].map((text, index) => (
          <ListItem
            button={true}
            onClick={() => onClickHandler(index)}
            key={text}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Signout"].map((text, index) => (
          <ListItem button={true} onClick={handleSignOut} key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isSignedIn && (
            <>
              <IconButton
                edge="start"
                className={classes.iconButton}
                color="inherit"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={state} onClose={toggleDrawer}>
                {list()}
              </Drawer>
            </>
          )}
          <Typography
            component={Link}
            to={isSignedIn ? "/home" : "/signin"}
            variant="h6"
            className={classes.title}
          >
            Member App
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};
