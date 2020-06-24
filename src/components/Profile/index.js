import React, { Component } from 'react';
import './styles.css';
import MailIcon from '@material-ui/icons/Mail';

class Profile extends Component {
    state = { }
    render() { 
        const {user, displayedUser} = this.props
        return (
        <div className='profile'>
            <div className='profileContainer'>
                <div className='imageContainer'>
                    <img src={require('../../data/userIcon.png')} className='profilePic'/>
                </div>
                <div className='textContainer'>
                    <div className='profileText'>
                        <h1>Name: {displayedUser.firstName} {displayedUser.lastName}</h1>
                    </div>
                    <div className='profileText'>
                    <h1>Account Type: User </h1>
                    </div>
                    <div className = 'profileText'>
                        <h1>Location: {displayedUser.location} </h1>
                    </div>
                </div>
                <MailIcon/>
            </div>
            <div>
                <h1>
                    Posts:
                </h1>
            </div>
        </div>
        )
    }
}
 
export default Profile;