import React, { Component } from 'react';

class Profile extends Component {
    state = {  }
    render() { 
        const { user, displayedUser } = this.props
        return (  
            <div>{`${user.firstName} ${user.lastName} is viewing 
            ${displayedUser.firstName} ${displayedUser.lastName}'s profile`}</div>
        );
    }
}
 
export default Profile;