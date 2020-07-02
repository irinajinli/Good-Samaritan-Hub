import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ReportIcon from '@material-ui/icons/Report';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';

import MyDialog from '../MyDialog';
import './styles.css';
import '../../index.css';
import { getDistance } from '../../actions/distance';
import { getUser } from '../../actions/search';

class Post extends Component {
    state = {  
        dialogOpen: false
    }

    generateTypeChip() {
        const {post} = this.props;
        let className = ''
        if (post.type === 'Request') {
            className = 'post__type-request'
        } else {
            className = 'post__type-offer'
        }
        return <Chip className={className} label={post.type} />
    }

    handleReport = () => {
        console.log(this.props.users)
        this.handleCloseDialog();
        this.setState({ dialogOpen: false });
        this.props.handleReportPost(this.props.post);
    }

    handleRemovePost = () => {
        this.handleCloseDialog();
        this.setState({ dialogOpen: false });
        this.props.deactivatePost(this.props.post);
    }

    handleOpenDialog = () => {
        this.setState({ dialogOpen: true });
    }

    handleCloseDialog = () => {
        this.setState({ dialogOpen: false });
    }
    
    render() { 
        const { dialogOpen } = this.state;
        const { user, users, post, targetLocation, isExpanded, handleExpandPost, handleBack, handleGoToProfile } = this.props;

        // Get the poster
        const poster = getUser(post.posterId, users);

        // Format the post's date
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(post.date)

        // Calculate the distance between this post's location and the current target location
        let dist = getDistance(targetLocation, post.location);
        dist = Math.round(dist * 10) / 10; // round to 1 decimal place

        return (  
            <React.Fragment>
                <Card className='post__card'>
                    <div className='post__block'>
                        <div className='post__left-block'>
                            <div className='post__poster'>
                                <span className='hover-pointer' onClick={() => handleGoToProfile(poster)}>
                                    {`${poster.firstName} ${poster.lastName}`}
                                </span>
                                {` — ${month} ${day}, ${year }`}
                            </div>
                            <div className='post__title'>{post.title}</div>
                        </div>
                        <div className='post__right-block'>
                            {this.generateTypeChip()}
                            <Chip 
                                className='post__distance' 
                                label={`${post.location}, ${dist} km`} 
                                icon={<LocationOnIcon className='post__distance-icon'/>} 
                            />
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
                            {user.username !== poster.username &&
                            <React.Fragment>
                                <Button className='post__send-msg-btn'>
                                    Send a message
                                </Button>
                                <IconButton size='small' className='post__report-btn' onClick={this.handleOpenDialog}>
                                    <ReportIcon fontSize='small' color='disabled'/>
                                </IconButton>
                            </React.Fragment>}
                            {user.username === poster.username &&
                            <React.Fragment>
                                <IconButton size='small' className='post__remove-post-btn' onClick={this.handleOpenDialog}>
                                    <VisibilityOffIcon fontSize='small' color='disabled'/>
                                </IconButton>
                            </React.Fragment>}
                        </div>
                    </React.Fragment>}
                </Card>

                <Modal open={dialogOpen && user.username !== poster.username}>
                    {/* <DialogContent> */} 
                    {/* {Wrapping ReportDialog with DialogContent gets rid of the error in the console, 
                    but also creates a weird bar at the top of the screen} */}
                        <MyDialog 
                            title='Report this post?'
                            body=''
                            actionName='Report'
                            handleClose={this.handleCloseDialog}
                            handleDoAction={this.handleReport}
                        />
                    {/* </DialogContent> */}
                </Modal>

                <Modal open={dialogOpen && user.username === poster.username}>
                    {/* <DialogContent> */} 
                    {/* {Wrapping ReportDialog with DialogContent gets rid of the error in the console, 
                    but also creates a weird bar at the top of the screen} */}
                        <MyDialog 
                            title='Remove this post?'
                            body='This post will be permanently hidden from public view but will still be viewable by you on your profile.'
                            actionName='Remove'
                            handleClose={this.handleCloseDialog}
                            handleDoAction={this.handleRemovePost}
                        />
                    {/* </DialogContent> */}
                </Modal>
            </React.Fragment>
        );
    }
}
 
export default Post;