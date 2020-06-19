import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './styles.css'

class UserSearchResult extends Component {
    state = {  }
    render() { 
        const { user } = this.props
        return (  
            <Card className='user__card'>
                <div className='user__block'>
                    <div className='user__left-block'>
                        <IconButton><AccountCircleIcon color='disabled'/></IconButton>  
                    </div>
                    <div className='user__left-block'>
                        <div className='user__username'>{`@${user.username}`}</div>
                        <div className='user__name'>{`${user.firstName} ${user.lastName}`}</div>
                    </div>
                </div>
            </Card>
        );
    }
}
 
export default UserSearchResult;