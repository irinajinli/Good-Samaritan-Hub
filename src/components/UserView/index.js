import React, { Component } from 'react';
import { withRouter } from 'react-router'

import UserTopBar from '../UserTopBar';
import Home from '../Home';
import Profile from '../Profile';
import Inbox from '../Inbox';
import './styles.css';

import { sortByDistance } from '../../actions/distance'
import { createPost, reportPost, deactivatePost } from '../../actions/user';

class UserView extends Component {
    state = {
        searchTerm: '',
        recentlyReportedPosts: [], // Posts reported by the user become hidden to the user for the rest of their session

        viewingHome: true,
        showSearchResults: false,
        showExpandedPost: false,
        expandedPost: {},
        creatingNewPost: false,

        viewingProfile: false,
        displayedUser: {},

        viewingInbox: false
    }

    sortPosts() {
        const { user, posts, appComponent } = this.props;
        appComponent.setState({
            posts: sortByDistance(user, posts)
        });
    }

    componentDidMount() {
        this.sortPosts();
    }

    componentDidUpdate(prevProps) {
        // Handle browser back button
        const { showSearchResults, showExpandedPost, viewingProfile, viewingInbox } = this.state;
        window.onpopstate = () => {
            if (showSearchResults && (showExpandedPost || viewingProfile || viewingInbox)) {
                this.handleBackToSearchResults();
            } else {
                this.handleBackToHome();
            }
        }

        // Re-sort posts when new posts are added
        if (prevProps.posts.length < this.props.posts.length) {
            this.sortPosts();
        }
    }

    handleBackToHome = () => {
        this.props.history.push('/home');
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: false,
            viewingHome: true,
            viewingProfile: false,
            displayedUser: {},
            viewingInbox: false
        });
    }

    handleBackToSearchResults = () => {
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: true,
            viewingHome: true,
            viewingProfile: false,
            displayedUser: {},
            viewingInbox: false
        });
    }

    handleExpandPost = post => {
        this.setState({
            showExpandedPost: true,
            expandedPost: post
        })
    }

    handleOpenPostCreator = () => {
        this.setState({
            creatingNewPost: true
        })
    }

    handleCreateNewPost = newPost => {
        createPost(newPost, this.props.appComponent);

        // Reset home page
        this.handleBackToHome();
    }

    handleSearch = searchTerm => {
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: true,
            searchTerm,
            viewingHome: true,
            viewingProfile: false,
            displayedUser: {},
            viewingInbox: false,
        });
    }

    handleGoToProfile = displayedUser => {
        this.setState({
            viewingHome: false,
            viewingProfile: true,
            displayedUser,
            viewingInbox: false,
        }, () => {
            this.props.history.push("/profile"); 
        });
    }

    handleGoToInbox = () => {
        this.setState({
            viewingHome: false,
            viewingProfile: false,
            viewingInbox: true
        });
        this.props.history.push("/inbox"); 
    }

    onLogout = () => {
        this.props.history.push("/");
        this.props.handleLogout();
    }

    handleReportPost = post => {
        // Add the post to the list of recently reported posts
        this.setState({
            recentlyReportedPosts: this.state.recentlyReportedPosts.concat(post)
        });

        // Report the poster in the global state
        reportPost(post, this.props.appComponent);
    }

    handleDeactivatePost = post => {
        deactivatePost(post, this.props.appComponent);
    }
    
    render() { 
        const { user, users, posts } = this.props;
        const { showSearchResults, showExpandedPost, expandedPost, creatingNewPost, searchTerm, 
            recentlyReportedPosts, viewingHome, viewingProfile, displayedUser, viewingInbox } = this.state;

        return (  
            <div className='logged-in-wrapper'>
                <UserTopBar 
                    user={user}
                    userViewComponent={this}
                    handleBackToHome={this.handleBackToHome}
                    handleSearch={this.handleSearch}
                    handleGoToProfile={this.handleGoToProfile}
                    handleGoToInbox={this.handleGoToInbox}
                    handleLogout={this.onLogout}
                />

                {/* Home page */}
                {viewingHome &&
                <Home
                    users={users}
                    user={user}
                    posts={posts}
                    creatingNewPost={creatingNewPost}
                    showExpandedPost={showExpandedPost}
                    expandedPost={expandedPost}
                    showSearchResults={showSearchResults}
                    recentlyReportedPosts={recentlyReportedPosts}
                    searchTerm={searchTerm}
                    handleBackToHome={this.handleBackToHome}
                    handleBackToSearchResults={this.handleBackToSearchResults}
                    handleGoToProfile={this.handleGoToProfile}
                    handleOpenPostCreator={this.handleOpenPostCreator}
                    handleCreateNewPost={this.handleCreateNewPost}
                    handleExpandPost={this.handleExpandPost}
                    handleReportPost={this.handleReportPost}
                    handleDeactivatePost={this.handleDeactivatePost}
                />}

                {/* Profile page */}
                {viewingProfile && 
                <Profile 
                    user={user}
                    displayedUser={displayedUser}
                />}

                {/* Inbox page */}
                {viewingInbox && 
                <Inbox 
                    user={user}
                />}

            </div>
        );
    }
}
 
export default withRouter(UserView);