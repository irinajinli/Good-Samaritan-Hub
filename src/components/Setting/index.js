import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import { updateUser } from '../../actions/user';

import './styles.css';

class Setting extends Component {
    state = { firstName: null,
        lastName: null,
        bio: null,
        location: null,

        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        
        oldNotMatch: false,
        newNotMatch: false,

    }

    initState = (displayedUser) => {
        this.setState({
            firstName: displayedUser.firstName,
            lastName: displayedUser.lastName,
            bio: displayedUser.bio,
            location: displayedUser.location,
            password: displayedUser.password
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value.trim()
        });
    }

    handleSaveInfo = (user, displayedUser) => {
        let changed = false;
        if (this.state.firstName === null) {
            this.initState(displayedUser);
        }
        if (this.state.firstName && displayedUser.firstName !== this.state.firstName) {
            displayedUser.firstName = this.state.firstName;
            changed = true;
        }
        if (this.state.lastName && displayedUser.lastName !== this.state.lastName) {
            displayedUser.lastName = this.state.lastName;
            changed = true;
        }
        if (this.state.bio && displayedUser.bio !== this.state.bio) {
            displayedUser.bio = this.state.bio;
            changed = true;
        }
        if (this.state.location && displayedUser.location !== this.state.location) {
            displayedUser.location = this.state.location;
            changed = true;
        }
        if (changed) {
            updateUser(user, displayedUser, this.props.appComponent);
        }
    }

    handleChangePassword = (user, displayedUser) => {
        let changed = false;
        if (this.state.firstName === null) {
            this.initState(displayedUser);
        }
        this.setState({oldNotMatch: displayedUser.password !== this.state.oldPassword});
        this.setState({newNotMatch: !this.state.newPassword ||
            this.state.newPassword !== this.state.confirmPassword});
        if (displayedUser.password === this.state.oldPassword && this.state.newPassword &&
            this.state.newPassword === this.state.confirmPassword &&
            this.state.newPassword !== displayedUser.password) {
            displayedUser.password = this.state.newPassword;
            updateUser(user, displayedUser, this.props.appComponent);
        }
    }

    render() {
        // NOTE: since The user can only edit their own profile, user === displayUser on this page
        const {user, users, displayedUser} = this.props
        const {oldNotMatch, newNotMatch} = this.state;
        return (
        <div className='profile'>
            <div className='profile__container'>
                <img src={require('../../resources/userIcon.png')} className='profile__icon'/>
                <Card className='profile__card'>
                    <h1>Your Profile</h1>
                    <TextField className="profile_textField"
                        label="Username"
                        defaultValue={displayedUser.username}
                        variant="outlined"
                        disabled/>
                    <div className='profile__name'>
                        <TextField className="profile_textField"
                            label="First Name"
                            defaultValue={displayedUser.firstName}
                            variant="outlined"
                            name="firstName"
                            onChange={this.handleInputChange}/>
                        <TextField className="profile_textField"
                            label="Last Name"
                            defaultValue={displayedUser.lastName}
                            variant="outlined"
                            name="lastName"
                            onChange={this.handleInputChange}/>
                    </div>
                    <TextField className="profile_textField"
                        label="Biography"
                        defaultValue={displayedUser.bio}
                        variant="outlined"
                        rows={5}
                        multiline
                        name="bio"
                        onChange={this.handleInputChange}/>
                    <TextField className="profile_textField"
                        label="Location"
                        defaultValue={displayedUser.location}
                        variant="outlined"
                        name="location"
                        onChange={this.handleInputChange}/>
                    <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={() => this.handleSaveInfo(user, displayedUser)}>Save</Button>
                    </div>
                </Card>
                <Card className='profile__card'>
                    <h1>Change Password</h1>
                    <TextField className="profile_textField"
                        label="Old Password"
                        type="password"
                        variant="outlined"
                        error={oldNotMatch}
                        helperText={oldNotMatch && "Incorrect Password"}
                        name="oldPassword"
                        onChange={this.handleInputChange}/>
                    <TextField className="profile_textField"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        error={newNotMatch}
                        name="newPassword"
                        onChange={this.handleInputChange}/>
                    <TextField className="profile_textField"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        error={newNotMatch}
                        helperText={newNotMatch && "Password does not match"}
                        name="confirmPassword"
                        onChange={this.handleInputChange}/>
                    <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={() => this.handleChangePassword(user, displayedUser)}>Save</Button>
                    </div>
                </Card>
            </div>
        </div>
        )
    }
}
 
export default Setting;