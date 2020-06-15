import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MailIcon from '@material-ui/icons/Mail';

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
}));

export default function UserTopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <EmojiNatureIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Good Samaritan Hub
          </Typography>

          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
              <MailIcon />
          </IconButton>
          
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <AccountBoxIcon />
          </IconButton>
            
          <Typography>John Smith</Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}
