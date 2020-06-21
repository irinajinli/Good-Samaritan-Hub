import React, { Component } from 'react';

class Profile extends Component {
    state = {  }
    render() { 
        const { user, userBeingViewed } = this.props
        return (  
            <div>{`${user.firstName} ${user.lastName} is viewing 
            ${userBeingViewed.firstName} ${userBeingViewed.lastName}'s profile`}</div>
        );
    }
}
 
export default Profile;