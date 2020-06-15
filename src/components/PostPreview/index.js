import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import './styles.css'

class PostPreview extends Component {
    state = {  
    }
    

    render() { 
        const {post} = this.props;
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(post.date)

        return (  
            <Card className='post-preview'>
                <CardContent>
                    <div className='post-preview__left-block'>
                        <div className='post-preview__poster'>
                            {post.poster}<span> — </span>{`${month} ${day}, ${year }`}
                        </div>
                        <div className='post-preview__title'>{post.title}</div>
                    </div>
                    <div className='post-preview__right-block'>
                        <Chip className='post-preview__type' label={post.type} />
                        <IconButton>
                            <ZoomOutMapIcon />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        );
    }
}
 
export default PostPreview;