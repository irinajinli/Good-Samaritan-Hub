import React, { Component } from 'react';
import { uid } from "react-uid";

import Post from '../Post'
import './styles.css'

class PostList extends Component {
    state = {
    }

    render() { 
        const {user, posts, handleExpandPost, showExpandedPost, 
            expandedPost, handleBack} = this.props;
        
        return (  
            <div className='post-list__container'>
                {!showExpandedPost && posts.map(post => (
                    <Post 
                        key={uid(post)}
                        user={user}
                        post={post}
                        isExpanded={showExpandedPost}
                        handleExpandPost={handleExpandPost}
                        handleBack={handleBack}
                    />
                ))}
                {showExpandedPost && 
                    <Post 
                        user={user}
                        post={expandedPost}
                        isExpanded={showExpandedPost}
                        handleExpandPost={handleExpandPost}
                        handleBack={handleBack}
                    />
                }
            </div>
        );
    }
}
 
export default PostList;