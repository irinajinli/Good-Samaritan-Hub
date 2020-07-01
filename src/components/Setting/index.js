import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import './styles.css';

class Profile extends Component {
    state = { }

    handleSaveInfo = () => {

    }

    handleChangePassword = () => {

    }

    render() { 
        const {user, displayedUser} = this.props
        return (
        <div className='profile'>
            <div className='profile__container'>
                <img src={require('../../resources/userIcon.png')} className='profile__icon'/>
                
                <Card className='profile__card'>
                    <h1>Your Profile</h1>
                    <TextField className="profile_textField"
                        label="Username"
                        defaultValue={displayedUser.username}
                        variant="outlined"/>
                    <div className='profile__name'>
                        <TextField className="profile_textField"
                            label="First Name"
                            defaultValue={displayedUser.firstName}
                            variant="outlined"/>
                        <TextField className="profile_textField"
                            label="Last Name"
                            defaultValue={displayedUser.lastName}
                            variant="outlined"/>
                    </div>
                    <TextField className="profile_textField"
                        label="Biography"
                        defaultValue={displayedUser.bio}
                        variant="outlined"
                        rows={5}
                        multiline/>
                    <TextField className="profile_textField"
                        label="Location"
                        defaultValue={displayedUser.location}
                        variant="outlined"/>
                    <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={this.handleSaveInfo}>Save</Button>
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
 
export default Profile;