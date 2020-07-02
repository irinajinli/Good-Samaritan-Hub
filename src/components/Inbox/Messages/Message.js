import React, { Component } from 'react'
import './styles.css'

class Message extends Component {
    render() {
        let classMessageName = "messageContainer"
        if (this.props.username == this.props.messageSender) {
            classMessageName += "RightMessage"
        } else {
            classMessageName += "LeftMessage"
        }
        return (
            <div className={classMessageName}>
                <p> {this.props.message} </p>
            </div>
        );
    }
}

export default Message;