import React, { Component } from 'react';
import { uid } from "react-uid";

import PostPreview from '../PostPreview'
import './styles.css'

class PostList extends Component {
    state = {  
    }

    render() { 
        const {user, posts} = this.props;
        return (  
            <div className='student-list__container'>
                {posts.map(post => (
                    <PostPreview 
                        key={uid(post)}
                        post={post}
                    />
                ))}
            </div>
        );
    }
}
 
export default PostList;