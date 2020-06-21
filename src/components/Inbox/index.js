import React, { Component } from 'react';

class Inbox extends Component {
    state = {  }
    render() { 
        const {user} = this.props
        return (  
            <div>{`${user.firstName} ${user.lastName}'s Inbox`}</div>
        );
    }
}
 
export default Inbox;