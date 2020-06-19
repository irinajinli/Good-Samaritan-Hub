import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ReportIcon from '@material-ui/icons/Report';

import './styles.css';

import { getDistance } from '../../actions/distance';

class Post extends Component {
    state = {  
    }

    generateTypeChip() {
        const {post} = this.props;
        let className = ''
        if (post.type == 'Request') {
            className = 'post__type-request'
        } else {
            className = 'post__type-offer'
        }
        return <Chip className={className} label={post.type} />
    }
    
    render() { 
        const {user, post, isExpanded, handleExpandPost, handleBackToHome} = this.props;

        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(post.date)

        let dist = getDistance(user, post.poster);
        dist = Math.round(dist * 10) / 10;

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
                        {this.generateTypeChip()}
                        <Chip className='post__distance' label={`${dist} km`} />
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
                <React.Fragment>
                    <div className='post__block'>
                        <div className='post__body'>{post.body}</div>
                    </div>
                    <div className='post__block post__footer'>
                        <Button className='post__send-msg-btn'>
                            Send a message
                        </Button>
                        <IconButton size='small' className='post__report-btn'>
                            <ReportIcon fontSize='small' color='disabled'/>
                        </IconButton>
                    </div>
                </React.Fragment>}
            </Card>
        );
    }
}
 
export default Post;