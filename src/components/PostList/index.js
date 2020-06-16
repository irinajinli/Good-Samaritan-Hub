import React, { Component } from 'react';
import { uid } from "react-uid";

import Post from '../Post'
import './styles.css'

class PostList extends Component {
    state = {  
    }

    render() { 
        const {posts, handleExpandPost, showExpandedPost, expandedPost, handleBackToHome} = this.props;
        return (  
            <div className='post-list__container'>
                {!showExpandedPost && posts.map(post => (
                    <Post 
                        key={uid(post)}
                        post={post}
                        isExpanded={showExpandedPost}
                        handleExpandPost={handleExpandPost}
                        handleBackToHome={handleBackToHome}
                    />
                ))}
                {showExpandedPost && 
                    <Post 
                        post={expandedPost}
                        isExpanded={showExpandedPost}
                        handleExpandPost={handleExpandPost}
                        handleBackToHome={handleBackToHome}
                    />
                }
            </div>
        );
    }
}
 
export default PostList;