import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ReportIcon from '@material-ui/icons/Report';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';

import ReportDialog from '../ReportDialog';
import './styles.css';
import { getDistance } from '../../actions/distance';

class Post extends Component {
    state = {  
        dialogOpen: false
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

    handleReport = () => {
        this.handleCloseDialog();
        this.setState({dialogOpen: false});
        this.props.handleReportPost(this.props.post);
    }

    handleOpenDialog = () => {
        this.setState({dialogOpen: true});
    }

    handleCloseDialog = () => {
        this.setState({dialogOpen: false});
    }
    
    render() { 
        const { dialogOpen } = this.state;
        const { user, post, isExpanded, handleExpandPost, handleBack, handleReportPost } = this.props;

        // Format the post's date
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(post.date)

        // Calculate distance between this post's poster and the current user
        let dist = getDistance(user, post.poster);
        dist = Math.round(dist * 10) / 10;

        return (  
            <React.Fragment>
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
                            <IconButton onClick={() => handleBack()}>
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
                            <IconButton size='small' className='post__report-btn' onClick={this.handleOpenDialog}>
                                <ReportIcon fontSize='small' color='disabled'/>
                            </IconButton>
                        </div>
                    </React.Fragment>}
                </Card>

                <Modal open={dialogOpen}>
                    <DialogContent>
                        <ReportDialog 
                            thing={'post'}
                            handleClose={this.handleCloseDialog}
                            handleReport={this.handleReport}
                        />
                    </DialogContent>
                </Modal>
            </React.Fragment>
        );
    }
}
 
export default Post;