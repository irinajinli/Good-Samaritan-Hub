import React, { Component } from 'react';
import { withRouter } from 'react-router'

import UserTopBar from '../UserTopBar';
import Home from '../Home';
import Profile from '../Profile';
import Inbox from '../Inbox';
import Setting from '../Setting';
import './styles.css';

import { sortByDistance, sortByDate } from '../../actions/sort'
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
        targetLocation: this.props.user.location, // Defaults to the user's location

        viewingProfile: false,
        displayedUser: {},

        viewingInbox: false,
        viewingEditProfile: false
    }

    // Sorts the posts from closest to farthest from the target location. Posts with the 
    // same distance from the target location are sorted from latest to earliest date
    sortPosts() {
        const { targetLocation } = this.state;
        const { posts, appComponent } = this.props;

        appComponent.setState({
            posts: sortByDistance(targetLocation, sortByDate(posts))
        });
    }

    componentDidMount() {
        this.sortPosts();
    }

    componentDidUpdate(prevProps) {
        const { showSearchResults, showExpandedPost, viewingProfile, viewingInbox } = this.state;

        // Reset the page to it's previous state when the browser's back button is clicked
        window.onpopstate = () => {
            if (showSearchResults && (showExpandedPost || viewingProfile || viewingInbox)) {
                this.handleBackToSearchResults();
            } else {
                this.handleBackToHome();
            }
        }

        // Re-sort the posts when new posts are added
        if (prevProps.posts.length < this.props.posts.length) {
            this.sortPosts();
        }
    }

    handleBackToHome = () => {
        // Phase 2: Make a server call to get any new posts that were added while we were on a different page
        // e.g. call appComponent's requestReload method

        this.props.history.push('/home');
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: false,
            viewingHome: true,
            viewingProfile: false,
            displayedUser: {},
            viewingInbox: false,
            viewingEditProfile: false
        });
    }

    handleBackToSearchResults = () => {
        // Phase 2: Make a server call to get any new posts that were added while we were on a different page
        // e.g. call appComponent's requestReload method

        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: true,
            viewingHome: true,
            viewingProfile: false,
            displayedUser: {},
            viewingInbox: false,
            viewingEditProfile: false
        });
    }

    handleChangeTargetLocation = targetLocation => {
        this.setState({
            targetLocation
        }, () => {
            // Sort the posts based on the new target location
            this.sortPosts();
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
            viewingEditProfile: false
        });
    }

    handleGoToProfile = displayedUser => {
        if (displayedUser === undefined) {
            displayedUser = this.state.displayedUser;
        }
        this.setState({
            viewingHome: false,
            viewingProfile: true,
            displayedUser,
            viewingInbox: false,
            showExpandedPost: false,
            viewingEditProfile: false,
            expandedPost: {}
        }, () => {
            this.props.history.push("/profile"); 
        });
    }

    handleGoToEditProfile = displayedUser => {
        if (displayedUser === undefined) {
            displayedUser = this.state.displayedUser;
        }
        this.setState({
            viewingHome: false,
            viewingProfile: false,
            displayedUser,
            viewingInbox: false,
            showExpandedPost: false,
            viewingEditProfile: true,
            expandedPost: {}
        }, () => {
            this.props.history.push("/setting"); 
        });
    }

    handleGoToInbox = () => {
        this.setState({
            viewingHome: false,
            viewingProfile: false,
            viewingInbox: true,
            viewingEditProfile: false
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

        // Report the post
        reportPost(post, this.props.appComponent);
    }

    handleDeactivatePost = post => {
        deactivatePost(post, this.props.appComponent);
    }
    
    render() { 
        const { user, users, posts } = this.props;
        const { showSearchResults, showExpandedPost, expandedPost, creatingNewPost, searchTerm, targetLocation,
            recentlyReportedPosts, viewingHome, viewingProfile, displayedUser, viewingInbox, viewingEditProfile } = this.state;

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

                {/* Home page (i.e. the post list, expanded post view, search results, 
                    and new post creator) */}
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
                    targetLocation={targetLocation}
                    searchTerm={searchTerm}
                    handleBackToHome={this.handleBackToHome}
                    handleBackToSearchResults={this.handleBackToSearchResults}
                    handleGoToProfile={this.handleGoToProfile}
                    handleChangeTargetLocation={this.handleChangeTargetLocation}
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
                    users={users}
                    displayedUser={displayedUser}
                    posts={posts}
                    targetLocation={targetLocation}
                    handleChangeTargetLocation={this.handleChangeTargetLocation}
                    handleExpandPost={this.handleExpandPost}
                    showExpandedPost={showExpandedPost}
                    expandedPost={expandedPost}
                    handleBack={this.handleBackToHome} 
                    handleReportPost={this.handleReportPost}
                    recentlyReportedPosts={recentlyReportedPosts}
                    handleGoToProfile={this.handleGoToProfile}
                    handleDeactivatePost={this.handleDeactivatePost}
                    handleGoToEditProfile={this.handleGoToEditProfile}
                />}

                {/* Inbox page */}
                {viewingInbox && 
                <Inbox 
                    user={user}
                />}

                {/* Edit Profile page */}
                {viewingEditProfile && 
                <Setting 
                    user={user}
                    displayedUser={displayedUser}
                    appComponent={this.props.appComponent}
                />}
            </div>
        );
    }
}
 
export default withRouter(UserView);