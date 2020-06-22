import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';

import MyDialog from '../MyDialog';
import './styles.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '21ch',
      '&:focus': {
        width: '21ch',
      },
    },
  },
});

class UserTopBar extends Component {
  state = {
    searchTerm: '',
    dialogOpen: false
  }

  handleOpenDialog = () => {
    this.setState({dialogOpen: true});
  }

  handleCloseDialog = () => {
      this.setState({dialogOpen: false});
  }

  handleLogOut = () => {
    // TODO
    console.log('logout');
  }

  handlePressEnter = event => {
    if (event.key == 'Enter') {
      this.props.handleSearch(this.state.searchTerm);

      // Clear input
      const target = event.target;
      const name = target.name;
      target.value = '';
      this.setState({
          [name]: ''
      });
    }
  }
  
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    this.setState({
        [name]: value
    });
  };

  render() {
    const { dialogOpen } = this.state
    const { classes, user, handleBackToHome, handleGoToProfile, handleGoToInbox } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
              onClick={handleBackToHome}>
              <EmojiNatureIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Good Samaritan Hub
            </Typography>

            <div className='user-top-bar__search-container'>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search for users or posts"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  name='searchTerm'
                  onChange={this.handleInputChange}
                  onKeyUp={this.handlePressEnter}
                />
              </div>
            </div>

            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu"
              onClick={handleGoToInbox}>
                <MailIcon />
            </IconButton>
            
            <IconButton edge="end" className={`${classes.menuButton} user-top-bar__profile-btn`} color="inherit" aria-label="menu" 
              onClick={() => handleGoToProfile(user)}>
              <AccountBoxIcon />
            </IconButton>
              
            <Typography>{`${user.firstName} ${user.lastName}`}</Typography>

            <IconButton edge="end" className={`${classes.menuButton} user-top-bar__logout-btn`} color="inherit" aria-label="menu" 
              onClick={() => this.handleOpenDialog()}>
              <ExitToAppIcon />
            </IconButton>

            <Modal open={dialogOpen}>
              {/* <DialogContent> */} 
              {/* {Wrapping ReportDialog with DialogContent gets rid of the error in the console, 
              but also creates a weird bar at the top of the screen} */}
              <MyDialog 
                  title='Are you sure you want to log out?'
                  body=''
                  actionName='Log out'
                  handleClose={this.handleCloseDialog}
                  handleDoAction={this.handleLogOut}
                />
              {/* </DialogContent> */}
            </Modal>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

UserTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserTopBar);