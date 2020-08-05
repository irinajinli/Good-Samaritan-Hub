import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';

import './styles.css'

class UserSearchResult extends Component {
    render() { 
        const { user, handleGoToProfile } = this.props
        return (  
            <Card className='user__card'>
                <div className='user__block'>
                    <div className='user__left-block'>
                        <IconButton onClick={() => handleGoToProfile(user)} className='user__icon-button'>
                                <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&format=svg`}
                                    alt='user icon' className='user__icon'/>
                        </IconButton>  
                    </div>
                    <div className='user__right-block'>
                        <div className='user__username hover-pointer' onClick={() => handleGoToProfile(user)}>
                            {`@${user.username}`}
                        </div>
                        <div className='user__name hover-pointer' onClick={() => handleGoToProfile(user)}>
                            {`${user.firstName} ${user.lastName}`}
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}
 
export default UserSearchResult;