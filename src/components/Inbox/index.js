import React, { Component } from 'react';
import './styles.css';
import InboxSideBarItem from './InboxSideBarItem/index'


class Inbox extends Component {
    state = { list: [
        {name: 'John Smith', image:'https://picsum.photos/70'},
        {name: 'Jane Smith', image:'https://picsum.photos/70'},
        {name: 'Lorem ipsum', image:'https://picsum.photos/70'},
        {name: 'Dolor Sit', image:'https://picsum.photos/70'},
        {name: 'Consectetur Adipiscing ', image:'https://picsum.photos/70'},
        {name: 'Eiusmod Tempor', image:'https://picsum.photos/70'},
        {name: 'Incididunt', image:'https://picsum.photos/70'},
        ] 
    }
    
    render() { 
        const {user} = this.props
        return ( 
            <div inboxScreen>
                <div className = "sideBar">
                    {this.state.list.map(user => 
                    <InboxSideBarItem
                        name={user.name}
                        image={user.image}
                    />
                     )}
                </div>
                <div className="messagesScreen">
                </div>
            </div>
        );
    }
}
 
export default Inbox;