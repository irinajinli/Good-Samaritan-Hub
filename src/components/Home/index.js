import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router'

import UserTopBar from '../UserTopBar';
import PostList from '../PostList';
import NewPostForm from '../NewPostForm';
import './styles.css';

class Home extends Component {
    
    state = {  
        showExpandedPost: false,
        expandedPost: {},
        creatingNewPost: false
    }

    componentDidUpdate() {
        // Reset home page when browser's back button is pressed
        window.onpopstate = () => {
            this.handleBackToHome();
        }
    }

    // Add /home the browser history so the browser's back button doesn't take the 
    // user back to the login page after expanding a post or creating a new post
    handleBrowserBackButton = () => {
        this.props.history.push('/home');
    }

    handleExpandPost = post => {
        this.handleBrowserBackButton();
        this.setState({
            showExpandedPost: true,
            expandedPost: post
        })
    }

    handleOpenPostCreator = () => {
        this.handleBrowserBackButton();
        this.setState({
            creatingNewPost: true
        })
    }

    handleBackToHome = () => {
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false
        })
    }

    handleCreateNewPost = newPost => {
        const {appComponent} = this.props;

        // Add new post to a copy of the global post list
        const newPosts = appComponent.state.posts.concat(newPost);

        // Add new post to a copy of the cloned user's post list
        const user = {...appComponent.state.user};
        const userPosts = user.posts.concat(newPost);
        user.posts = userPosts;

        // State should not be modified before we call setState
        console.log(appComponent.state.user)

        // Update appComponent's state
        appComponent.setState({
            posts: newPosts,
            user: user
        });

        // Reset home page
        this.handleBackToHome();
    }
    
    render() { 
        const { user, users, posts } = this.props;
        const { showExpandedPost, expandedPost, creatingNewPost} = this.state;

        return (  
            <div>
                <UserTopBar user={user} />

                {/* The middle section of the page */}
                <div className='home__middle-block'>
                    {!showExpandedPost && !creatingNewPost &&
                    <Button id='home__create-post-btn'
                            onClick={this.handleOpenPostCreator}                           
                    >
                        Make your own post{'\u00A0'}<CreateIcon />
                    </Button>}

                    {!creatingNewPost &&
                    <PostList 
                        posts={posts} 
                        handleExpandPost={this.handleExpandPost} 
                        showExpandedPost={showExpandedPost} 
                        expandedPost={expandedPost}
                        handleBackToHome={this.handleBackToHome} 
                    />}

                    {creatingNewPost && 
                    <NewPostForm
                        user={user}
                        handleBackToHome={this.handleBackToHome}
                        handleCreateNewPost={this.handleCreateNewPost}
                    />}
                </div>

            </div>
        );
    }
}
 
export default withRouter(Home);