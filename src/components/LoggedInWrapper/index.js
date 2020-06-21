import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router'

import UserTopBar from '../UserTopBar';
import PostList from '../PostList';
import NewPostForm from '../NewPostForm';
import SearchResults from '../SearchResults';
import Profile from '../Profile';
import Inbox from '../Inbox';
import './styles.css';

import { sortByDistance } from '../../actions/distance'

class LoggedInWrapper extends Component {
    state = {  
        showExpandedPost: false,
        expandedPost: {},
        creatingNewPost: false,
        showSearchResults: false,
        searchTerm: '',
        recentlyReportedPosts: [], // Posts reported by the user become hidden to the user for the rest of their session

        viewingProfile: false,
        userBeingViewed: {},

        viewingInbox: false
    }

    sortPosts() {
        const { user, posts, appComponent } = this.props;

        // Posts should not be modified before calling setState
        // console.log(posts);
        appComponent.setState({
            posts: sortByDistance(user, posts)
        });
    }

    componentDidMount() {
        this.sortPosts();
    }

    componentDidUpdate(prevProps) {
        // Reset home page when browser's back button is pressed
        window.onpopstate = () => {
            this.handleBackToHome();
        }

        if (prevProps.posts.length > this.props.posts.length) {
            this.sortPosts();
        }
    }

    // Add /home the browser history so the browser's back button doesn't take the 
    // user back to the login page after expanding a post or creating a new post
    addHomeToBrowserHistory = () => {
        this.props.history.push('/home');
    }

    handleExpandPost = post => {
        this.addHomeToBrowserHistory();
        this.setState({
            showExpandedPost: true,
            expandedPost: post
        })
    }

    handleOpenPostCreator = () => {
        this.addHomeToBrowserHistory();
        this.setState({
            creatingNewPost: true
        })
    }

    handleBackToHome = () => {
        this.addHomeToBrowserHistory();
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: false,
            viewingProfile: false,
            userBeingViewed: {},
            viewingInbox: false
        });
    }

    handleBackToSearchResults = () => {
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: true
        });
    }

    handleCreateNewPost = newPost => {
        const { user, posts, appComponent } = this.props;

        // Add new post to a copy of the global post list
        let newPosts = posts.concat(newPost);
        newPosts = sortByDistance(user, newPosts);

        // Add new post to a copy of the cloned user's post list
        const userCopy = { ...user };
        const userPosts = userCopy.posts.concat(newPost);
        userCopy.posts = userPosts;

        // State should not be modified before we call setState
        // console.log(posts)
        // console.log(user)

        // Update appComponent's state
        appComponent.setState({
            posts: newPosts,
            user: userCopy
        });

        // Reset home page
        this.handleBackToHome();
    }

    handleSearch = searchTerm => {
        this.addHomeToBrowserHistory();
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false,
            showSearchResults: true,
            searchTerm,
            viewingProfile: false,
            userBeingViewed: {},
            viewingInbox: false
        });
    }

    handleReportPost = post => {
        // Add the post to the list of recently reported posts
        this.setState({
            recentlyReportedPosts: this.state.recentlyReportedPosts.concat(post)
        });

        // Report the poster in the global state
        const { reportPost, appComponent } = this.props;
        reportPost(post, appComponent);
    }

    handleGoToProfile = userBeingViewed => {
        this.setState({
            viewingProfile: true,
            userBeingViewed,
            viewingInbox: false
        }, () => {
            this.props.history.push("/profile"); 
        });
    }

    handleGoToInbox = () => {
        this.setState({
            viewingProfile: false,
            viewingInbox: true
        }, () => {
            this.props.history.push("/inbox"); 
        });
    }
    
    render() { 
        const { user, posts, appComponent } = this.props;
        const { showExpandedPost, expandedPost, creatingNewPost, showSearchResults, searchTerm,
            recentlyReportedPosts, viewingProfile, userBeingViewed, viewingInbox } = this.state;

        return (  
            <div>
                <UserTopBar 
                    user={user}
                    homeComponent={this}
                    handleBackToHome={this.handleBackToHome}
                    handleSearch={this.handleSearch}
                    handleGoToProfile={this.handleGoToProfile}
                    handleGoToInbox={this.handleGoToInbox}
                />

                {/* Home page */}
                {!viewingProfile && !viewingInbox &&
                <div className='home__middle-block'>
                    {!showExpandedPost && !creatingNewPost && !showSearchResults &&
                    <Button id='home__create-post-btn'
                            onClick={this.handleOpenPostCreator}                           
                    >
                        Create a post{'\u00A0'}<CreateIcon />
                    </Button>}

                    {!creatingNewPost && !showSearchResults &&
                    <PostList 
                        user={user}
                        posts={posts} 
                        handleExpandPost={this.handleExpandPost} 
                        showExpandedPost={showExpandedPost} 
                        expandedPost={expandedPost}
                        handleBack={this.handleBackToHome} 
                        handleReportPost={this.handleReportPost}
                        recentlyReportedPosts={recentlyReportedPosts}
                        handleGoToProfile={this.handleGoToProfile}
                    />}

                    {creatingNewPost && 
                    <NewPostForm
                        user={user}
                        handleBackToHome={this.handleBackToHome}
                        handleCreateNewPost={this.handleCreateNewPost}
                    />}

                    {showSearchResults &&
                    <SearchResults 
                        searchTerm={searchTerm}
                        homeComponent={this}
                        appComponent={appComponent}
                        handleGoToProfile={this.handleGoToProfile}
                    />}
                </div>}

                {/* Profile page */}
                {viewingProfile && 
                <Profile 
                    user={user}
                    userBeingViewed={userBeingViewed}
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
 
export default withRouter(LoggedInWrapper);