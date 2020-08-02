import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";

import PostList from '../PostList';
import NewPostForm from '../NewPostForm';
import SearchResults from '../SearchResults';
import './styles.css';

class Home extends Component {
    render() { 
        const { user, users, recentlyReportedPosts, searchTerm, showExpandedPost, expandedPost, 
            creatingNewPost, showSearchResults, handleExpandPost, handleBackToHome, 
            handleOpenPostCreator, handleCreateNewPost, handleBackToSearchResults, handleReportPost, handleDeactivatePost, 
            handleGoToProfile, handleGoToInboxFromPost} = this.props;
            
        return (  
            <div className='home__middle-block'>
                {!showExpandedPost && !creatingNewPost && !showSearchResults &&
                <Button className='home__create-post-btn'
                        onClick={handleOpenPostCreator}                           
                >
                    <CreateIcon className='home__create-post-btn-icon'/>Create a post
                </Button>}

                {!creatingNewPost && !showSearchResults &&
                <PostList 
                    user={user}
                    users={users}
                    showInactivePosts={false}
                    restrictPostsToTargetLocation={true}
                    handleExpandPost={handleExpandPost} 
                    showExpandedPost={showExpandedPost} 
                    expandedPost={expandedPost}
                    handleBack={handleBackToHome} 
                    handleReportPost={handleReportPost}
                    recentlyReportedPosts={recentlyReportedPosts}
                    handleGoToProfile={handleGoToProfile}
                    handleGoToInboxFromPost={handleGoToInboxFromPost}
                    deactivatePost={handleDeactivatePost}
                />}

                {creatingNewPost && 
                <NewPostForm
                    user={user}
                    handleBackToHome={handleBackToHome}
                    handleCreateNewPost={handleCreateNewPost}
                />}

                {showSearchResults &&
                <SearchResults 
                    user={user}
                    users={users}
                    searchTerm={searchTerm}
                    expandedPost={expandedPost}
                    recentlyReportedPosts={recentlyReportedPosts}
                    showExpandedPost={showExpandedPost}
                    handleExpandPost={handleExpandPost}
                    handleGoToProfile={handleGoToProfile}
                    handleBackToSearchResults={handleBackToSearchResults}
                    handleReportPost={handleReportPost}
                    handleDeactivatePost={handleDeactivatePost}
                    handleGoToInboxFromPost={handleGoToInboxFromPost}
                />}

                <div className='home__footer'></div>
            </div>
        );
    }
}
 
export default Home;