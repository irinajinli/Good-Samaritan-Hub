// NOTE: this is copied & pasted from https://material-ui.com/components/app-bar/#simple-app-bar

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconLink: {
    color: 'white'
  }, 
  loginRegButton: {
    color: 'white'
  }
}));

export default function TopBar() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Link className={classes.iconLink} to={"/"}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <EmojiNatureIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Good Samaritan Hub
          </Typography>
          {window.location.pathname !== '/admin' &&
            <Link className="link" to={"/login"}>
            <Button className={classes.loginRegButton}>
              Login{'\u00a0'}/{'\u00a0'}Register
            </Button>
          </Link>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
