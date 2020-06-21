import React, { Component } from 'react';

class Profile extends Component {
    render() { 
        const { userBeingViewed } = this.props
        return (  
            <div>{`${userBeingViewed.firstName} ${userBeingViewed.lastName}'s profile`}</div>
        );
    }
}
 
export default Profile;