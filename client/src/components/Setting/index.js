import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveSnackBar from './SaveSnackBar/index';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { updateProfileInfo, updatePassword } from '../../actions/user';
import { getPostalCodePrefixes } from '../../actions/location';

import './styles.css';

class Setting extends Component {
    state = { 
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        bio: this.props.user.bio,
        location: this.props.user.location,

        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        
        firstNameEmpty: false,
        lastNameEmpty: false,
        oldNotMatch: false,
        newNotMatch: false,
        newTooShort: false,

        snackBarOpen: false,

        postalCodePrefixes: []
    }

    componentDidMount() {
        getPostalCodePrefixes()
            .then(postalCodePrefixes => {
                this.setState({
                postalCodePrefixes
                });
            })
            .catch(error => {
                console.log('Could not get postal codes');
                this.setState({
                postalCodePrefixes: []
                });
            });
    }

    handleCloseSnackBar = () => this.setState({snackBarOpen: false});

    handleLocationChange = (event, values) => {
        this.setState({
            location: values
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value.trim()
        });
    }

    handleSaveInfo = () => {
        const userCopy = {...this.props.user}; // clone displayed user
        let changed = false;
        let locationChanged = false;
        this.setState({firstNameEmpty: this.state.firstName === ''});
        if (this.state.firstName && userCopy.firstName !== this.state.firstName) {
            userCopy.firstName = this.state.firstName;
            changed = true;
        }
        this.setState({lastNameEmpty: this.state.lastName === ''});
        if (this.state.lastName && userCopy.lastName !== this.state.lastName) {
            userCopy.lastName = this.state.lastName;
            changed = true;
        }
        if (this.state.bio && userCopy.bio !== this.state.bio) {
            userCopy.bio = this.state.bio;
            changed = true;
        }
        if (this.state.location && userCopy.location !== this.state.location) {
            userCopy.location = this.state.location;
            changed = true;
            locationChanged = true;
        }
        if (changed) {
            updateProfileInfo(this.props.user, userCopy)
                .then(updatedUser => {
                    this.props.appComponent.setState({
                        user: updatedUser
                    });
                    this.setState({ snackBarOpen: true });
                    setTimeout(() => this.handleCloseSnackBar(), 5000);
                    if (locationChanged) {
                        this.props.handleChangeTargetLocation(updatedUser.location);
                    }
                })
                .catch(error => {
                    console.log(error)
                    alert('Unable to save information. Please try again.');
                })
        }
    }

    handleChangePassword = () => {
        this.setState({newNotMatch: !this.state.newPassword ||
            this.state.newPassword !== this.state.confirmPassword});
        this.setState({newTooShort: !this.state.newPassword ||
            this.state.newPassword.length < 8});
        if (this.state.newPassword && this.state.newPassword.length >= 8 &&
            this.state.newPassword === this.state.confirmPassword) {
            updatePassword(this.props.user.username, this.state.oldPassword, this.state.newPassword)
                .then(status => {
                    console.log(status)
                    if(status === 200) {
                        console.log("update password successful");
                        this.setState({
                            snackBarOpen: true,
                            oldNotMatch: false
                        });
                        setTimeout(() => this.handleCloseSnackBar(), 5000);
                    } else if (status === 401) {
                        this.setState({oldNotMatch: true});
                    } else {
                        throw new Error(status);
                    }
                })
                .catch(error => {
                    alert('Unable to change password. Please try again.')
                });
        } 
    }

    render() {
        // NOTE: since The user can only edit their own profile, user === displayUser on this page
        const { user, handleGoToProfile } = this.props
        const { firstNameEmpty, lastNameEmpty, oldNotMatch, newNotMatch, newTooShort, snackBarOpen, postalCodePrefixes } = this.state;
        
        return (
        <div className='profile'>
            <div className='profile__container'>
                <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&format=svg`} alt='user icon' className='profile__icon'/>
                <div>
                    <Button className='setting__back-btn'
                        onClick={() => handleGoToProfile(user)}>
                        <ArrowBackIcon className='setting__btn-icon'/>Go back to profile
                    </Button>
                </div>
                <Card className='profile__card'>
                    <h1>Your Profile</h1>
                    <TextField className="profile_textField"
                        label="Username"
                        defaultValue={user.username}
                        variant="outlined"
                        disabled/>
                    <div className='profile__name'>
                        <TextField className="profile_textField"
                            label="First Name"
                            defaultValue={user.firstName}
                            variant="outlined"
                            name="firstName"
                            error={firstNameEmpty}
                            helperText={firstNameEmpty && "Name cannot be empty"}
                            onChange={this.handleInputChange}/>
                        <TextField className="profile_textField"
                            label="Last Name"
                            defaultValue={user.lastName}
                            variant="outlined"
                            name="lastName"
                            error={lastNameEmpty}
                            helperText={lastNameEmpty && "Name cannot be empty"}
                            onChange={this.handleInputChange}/>
                    </div>
                    <TextField className="profile_textField"
                        label="Biography"
                        defaultValue={user.bio}
                        variant="outlined"
                        rows={5}
                        multiline
                        name="bio"
                        onChange={this.handleInputChange}/>
                    <Autocomplete
                        className='profile_textField'
                        defaultValue={user.location}
                        disableClearable
                        onChange={this.handleLocationChange}
                        options={postalCodePrefixes}
                        renderInput={(params) => <TextField label='Location' variant='outlined'{...params}/>}
                    />
                    <div className='profile__button'>
                        <Button 
                            className='profile__save-button' 
                            startIcon={<EditIcon/>} 
                            onClick={this.handleSaveInfo}>Save
                        </Button>
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
                        error={newNotMatch || newTooShort}
                        helperText={newTooShort && "Password must be at least 8 characters!"}
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
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={this.handleChangePassword}>Save</Button>
                    </div>
                </Card>
            </div>
            <div className='profile__footer'></div>
            {snackBarOpen && <SaveSnackBar handleClose={this.handleCloseSnackBar}/>}
        </div>
        )
    }
}
 
export default Setting;