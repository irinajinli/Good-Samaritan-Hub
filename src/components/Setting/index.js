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
        password: null }

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
        if (!this.state.firstName) {
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
            
        }
    }

    handleChangePassword = () => {

    }

    render() {
        // NOTE: since The user can only edit their own profile, user === displayUser on this page
        const {user, users, displayedUser} = this.props
        const {username, firstName, lastName, bio, location, password} = this.state;
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
                        variant="outlined"/>
                    <TextField className="profile_textField"
                        label="New Password"
                        type="password"
                        variant="outlined"/>
                    <TextField className="profile_textField"
                        label="Confirm"
                        type="password"
                        variant="outlined"/>
                    <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={this.handleChangePassword}>Save</Button>
                    </div>
                </Card>
            </div>
        </div>
        )
    }
}
 
export default Setting;