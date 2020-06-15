import React, { Component } from 'react';
import { uid } from "react-uid";

import PostPreview from '../PostPreview'

class PostList extends Component {
    state = {  
    }

    render() { 
        const {posts} = this.props;
        return (  
            <div>
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