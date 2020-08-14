import React, { Component } from 'react'
import './styles.css'

class MessageTopBar extends Component {
    state = {}
    render() {
        console.log(this.props)
        return (
            <span className="messageTopBarContainer">
            {this.props.currUser != null &&
            <h3 className="messageTopBarPerson" onClick={() => this.props.handleGoToProfile(this.props.currUser)}>
                {this.props.currUser.firstName} {this.props.currUser.lastName} (Location: {this.props.currUser.location})</h3>
            }
            {this.props.currPost != null &&
            <h3 className="messageTopBarPost">
                {this.props.currPost.type}: {this.props.currPost.title}</h3>
            }
            </span>
        )
    }
}

export default MessageTopBar
