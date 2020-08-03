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
// import DialogContent from '@material-ui/core/DialogContent';

import MyDialog from '../MyDialog';
import './styles.css';
import '../../index.css';
import { getUserByUsername } from '../../actions/user';
import { getDateDiff } from './date'

class Post extends Component {
    state = {  
        dialogOpen: false,
        poster: {
            username: '',
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        getUserByUsername(this.props.post.posterUsername)
            .then(poster => {
                this.setState({
                    poster 
                });
            })
            .catch(error => {
                this.setState({
                    poster: {
                        username: 'User not found',
                        firstName: 'User not found',
                        lastName: ''
                    }
                });
            })
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
        const { dialogOpen, poster } = this.state;
        const { user, users, post, isExpanded, handleExpandPost, handleBack, handleGoToProfile, handleGoToInboxFromPost} = this.props;

        // Format the post's date
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(post.date)

        // Calculate date difference from today
        const diffString = getDateDiff(post);

        return (  
            <React.Fragment>
                <Card className='post__card'>
                    {post.status === 'inactive' &&
                    <div className='post__block post__status post--small-grey'>
                        <span>Inactive (Hidden from public)</span>
                    </div>}

                    <div className='post__block'>
                        <div className='post__left-block'>
                            <div className='post--small-grey'>
                                <span className='hover-pointer' onClick={() => handleGoToProfile(poster)}>
                                    {`${poster.firstName} ${poster.lastName}`}
                                </span>
                                {` — ${month} ${day}, ${year } (${diffString})`}
                            </div>
                            <div className='post__title'>{post.title}</div>
                        </div>
                        <div className='post__right-block'>
                            {this.generateTypeChip()}
                            <Chip 
                                className='post__distance' 
                                label={`${post.location}`}
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
                                <Button className='post__send-msg-btn' onClick={() => handleGoToInboxFromPost(poster)}>
                                    Send a message
                                </Button>
                                <IconButton size='small' className='post__report-btn' onClick={this.handleOpenDialog}>
                                    <ReportIcon fontSize='small' color='disabled'/>
                                </IconButton>
                            </React.Fragment>}
                            {user.username === poster.username && post.status === 'active' &&
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
                            body='This post will be permantly hidden from you.'
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