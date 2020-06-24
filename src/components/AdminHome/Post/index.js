import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';

import './styles.css';
import Label from './../label.js';

function generateChip(post) {
    return post.status === "active" ?
        <Chip className="post__chip-active" label="Active"/> :
        <Chip className="post__chip" label="Inactive"/>;
}

class Post extends Component {
    render() {
        const {post} = this.props;
        return (
            <div className="post">
                <div className="post__header">
                    <h2>{post.title}</h2>
                    {generateChip(post)}
                </div>
                <Label primary="Type" secondary={post.type}/>
                <Label primary="Posted on" secondary={`${post.date.getFullYear()}-${post.date.getMonth()}-${post.date.getDate()}`}/>
                <p className="post__p">{post.body}</p> 
                
            </div>
        );
    }
}

export default Post;