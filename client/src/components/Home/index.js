import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";

import PostList from '../PostList';
import NewPostForm from '../NewPostForm';
import SearchResults from '../SearchResults';
import './styles.css';

class Home extends Component {
    render() { 
        const { user, users, targetLocation, searchTerm, showExpandedPost, expandedPost, 
            creatingNewPost, showSearchResults, handleExpandPost, handleBackToHome, handleChangeTargetLocation, 
            handleOpenPostCreator, handleCreateNewPost, handleBackToSearchResults, handleHidePostFromUser, 
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
                    targetLocation={targetLocation}
                    restrictPostsToTargetLocation={true}
                    handleChangeTargetLocation={handleChangeTargetLocation}
                    handleExpandPost={handleExpandPost} 
                    showExpandedPost={showExpandedPost} 
                    expandedPost={expandedPost}
                    handleBack={handleBackToHome} 
                    handleHidePostFromUser={handleHidePostFromUser}
                    handleGoToProfile={handleGoToProfile}
                    handleGoToInboxFromPost={handleGoToInboxFromPost}
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
                    targetLocation={targetLocation}
                    searchTerm={searchTerm}
                    expandedPost={expandedPost}
                    handleChangeTargetLocation={handleChangeTargetLocation}
                    showExpandedPost={showExpandedPost}
                    handleExpandPost={handleExpandPost}
                    handleGoToProfile={handleGoToProfile}
                    handleBackToSearchResults={handleBackToSearchResults}
                    handleHidePostFromUser={handleHidePostFromUser}
                    handleGoToInboxFromPost={handleGoToInboxFromPost}
                />}

                <div className='home__footer'></div>
            </div>
        );
    }
}
 
export default Home;