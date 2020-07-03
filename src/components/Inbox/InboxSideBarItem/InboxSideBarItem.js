import React, { Component } from 'react'
import './styles.css';

class InboxSideBarItem extends Component {
    state = {}
    render() {
        const { username, name, image , activeUser} = this.props
        console.log('Username is ' + username + ' curr user is ' + activeUser) 
        let classMessageName = "inboxSideBarItemContainer"
        if (username == activeUser) {
            classMessageName += "Selected"
        } 
        return (
            <div class={classMessageName} onClick={() => this.props.handleChangeSelectedUser(username)}>
                <img src={image} className='inboxSideBarItemImage' />
                <div class='inboxSideBarItemName'>
                    <p>{name}</p>
                </div>
            </div>
        )
    }
}

export default InboxSideBarItem
