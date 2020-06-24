import React, { Component } from 'react'
import './styles.css';

class InboxSideBarItem extends Component {
    state = {}
    render() { 
        const {name, image} = this.props
        return (
            <div class='inboxSideBarItemContainer'>
                <img src={image} className='inboxSideBarItemImage'/>
                <div class='inboxSideBarItemName'>
                <p>{name}</p>
                </div>
            </div>
        )
    }
}

export default InboxSideBarItem
