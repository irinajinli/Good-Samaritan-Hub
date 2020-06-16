import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import './styles.css'

class Post extends Component {
    state = {  
    }
    
    render() { 
        const {post, isExpanded, handleExpandPost , handleBackToHome} = this.props;
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(post.date)

        return (  
            <Card className='post__card'>
                <div className='post__block'>
                    <div className='post__left-block'>
                        <div className='post__poster'>
                            {`${post.poster.firstName} ${post.poster.lastName}`}<span> — </span>{`${month} ${day}, ${year }`}
                        </div>
                        <div className='post__title'>{post.title}</div>
                    </div>
                    <div className='post__right-block'>
                        <Chip className='post__type' label={post.type} />
                        <Chip className='post__distance' label={`${16} km`} /> {/* TODO: calc distance */}
                        {!isExpanded && 
                        <IconButton onClick={() => handleExpandPost(post)}>
                            <ArrowForwardIcon />
                        </IconButton>}
                        {isExpanded && 
                        <IconButton onClick={() => handleBackToHome(post)}>
                            <ArrowBackIcon />
                        </IconButton>}
                    </div>
                </div>
                {isExpanded && 
                <div className='post__block'>
                    <div className='post__body'>{post.body}</div>
                </div>}
            </Card>
        );
    }
}
 
export default Post;