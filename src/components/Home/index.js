import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";

import PostList from '../PostList';
import NewPostForm from '../NewPostForm';
import SearchResults from '../SearchResults';
import './styles.css';

class Home extends Component {
    render() { 
        const { user, users, posts, recentlyReportedPosts, searchTerm, showExpandedPost, expandedPost, 
            creatingNewPost, showSearchResults, handleExpandPost, handleBackToHome, handleOpenPostCreator, handleCreateNewPost, 
            handleBackToSearchResults, handleReportPost, handleDeactivatePost, handleGoToProfile} = this.props;
        // const { showExpandedPost, expandedPost, creatingNewPost } = this.state;
        return (  
            <div className='home__middle-block'>
                {!showExpandedPost && !creatingNewPost && !showSearchResults &&
                <Button id='home__create-post-btn'
                        onClick={handleOpenPostCreator}                           
                >
                    Create a post{'\u00A0'}<CreateIcon />
                </Button>}

                {!creatingNewPost && !showSearchResults &&
                <PostList 
                    user={user}
                    posts={posts} 
                    handleExpandPost={handleExpandPost} 
                    showExpandedPost={showExpandedPost} 
                    expandedPost={expandedPost}
                    handleBack={handleBackToHome} 
                    handleReportPost={handleReportPost}
                    recentlyReportedPosts={recentlyReportedPosts}
                    handleGoToProfile={handleGoToProfile}
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
                    posts={posts}
                    searchTerm={searchTerm}
                    expandedPost={expandedPost}
                    recentlyReportedPosts={recentlyReportedPosts}
                    showExpandedPost={showExpandedPost}
                    handleExpandPost={handleExpandPost}
                    handleGoToProfile={handleGoToProfile}
                    handleBackToSearchResults={handleBackToSearchResults}
                    handleReportPost={handleReportPost}
                    handleDeactivatePost={handleDeactivatePost}
                />}

                <div className='home__footer'></div>
            </div>
        );
    }
}
 
export default Home;