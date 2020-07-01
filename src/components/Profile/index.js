import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import Table from './userTable/index.js';
import PostList from '../PostList';

import './styles.css';

const columns = [{id: "label", name: "Label"}, {id: "content", name: "Content"}];

class Profile extends Component {
    state = {
        targetLocation: this.props.user.location, // Defaults to the user's locatio
    }

    generateRows = (user) => {
        const rows = [];
        rows.push({label: "Username", content: user.username});
        rows.push({label: "First Name", content: user.firstName});
        rows.push({label: "Last Name", content: user.lastName});
        rows.push({label: "Biography", content: user.bio});
        rows.push({label: "Location", content: user.location});
        return rows;
    }

    getPosts = (user, posts) => {
        const userPosts = [];
        for (let i = 0; i < user.posts.length; i++) {
            userPosts.push(posts[user.posts[i]]);
        }
        return userPosts;
    }

    render() { 
        const {user, displayedUser, posts, handleChangeTargetLocation, handleExpandPost, showExpandedPost, expandedPost,
            handleBackToHome, handleReportPost, recentlyReportedPosts, handleGoToProfile, handleDeactivatePost} = this.props;
        const {targetLocation} = this.state;
        return (
        <div className='profile'>
            <div className='profile__container'>
                <img src={require('../../resources/userIcon.png')} className='profile__icon'/>
                
                <Card className='profile__card'>
                    <h1>Profile</h1>
                    <Table columns={columns} rows={this.generateRows(displayedUser)}/>
                    {user === displayedUser && <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={this.handleSaveInfo}>Edit</Button>
                    </div>}
                </Card>
                {!displayedUser.posts.length && <Card className='profile__card'>
                    <h1>User has not posted</h1>
                </Card>}
                <div className='profile__card'>
                    {displayedUser.posts.length > 0 && <PostList
                        user={user}
                        posts={this.getPosts(displayedUser, posts)} 
                        targetLocation={targetLocation}
                        handleChangeTargetLocation={handleChangeTargetLocation}
                        handleExpandPost={handleExpandPost} 
                        showExpandedPost={showExpandedPost} 
                        expandedPost={expandedPost}
                        handleBack={handleBackToHome} 
                        handleReportPost={handleReportPost}
                        recentlyReportedPosts={recentlyReportedPosts}
                        handleGoToProfile={handleGoToProfile}
                        deactivatePost={handleDeactivatePost}
                    />}
                </div>
            </div>
        </div>
        )
    }
}
 
export default Profile;