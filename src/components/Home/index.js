import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router'

import UserTopBar from '../UserTopBar';
import PostList from '../PostList';
import NewPostForm from '../NewPostForm';
import './styles.css';

class Home extends Component {
    users = [
        {
            username: 'user',
            password: 'user',
            firstName: 'John',
            lastName: 'Smith',
            location: '', // TODO
            bio: 'Hello world, I am John Smith!',
            posts: [],
            messagesSent: [],
            messagesRecieved: [],
            isReported: false,
            isBanned: false,
            reportedMessages: [],
            reportedPosts: [],
            banReason: ''
        },
        {
            username: 'user2',
            password: 'user2',
            firstName: 'Bobsy',
            lastName: 'Bob',
            location: '', // TODO
            bio: 'Hello world, I am Bobsy Bob!',
            posts: [],
            messagesSent: [],
            messagesRecieved: [],
            isReported: false,
            isBanned: false,
            reportedMessages: [],
            reportedPosts: [],
            banReason: ''
        },
        {
            username: 'user3',
            password: 'user3',
            firstName: 'Diane',
            lastName: 'Doe',
            location: '', // TODO
            bio: 'Hello world, I am Diane Doe!',
            posts: [],
            messagesSent: [],
            messagesRecieved: [],
            isReported: false,
            isBanned: false,
            reportedMessages: [],
            reportedPosts: [],
            banReason: ''
        },
    ];

    posts = [
        {
            title: 'Grocery Pickup',
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
                commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
                eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
                nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
                adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
            poster: this.users[1],
            type: 'Request',
            date: new Date(2020, 6, 12),
            status: 'active'
        },
        {
            title: 'Any pickup in Etobicoke Area',
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
                commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
                eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
                nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
                adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
            poster: this.users[2],
            type: 'Offer',
            date: new Date(2020, 6, 5),
            status: 'active'
        }
    ];

    state = {  
        user: this.users[0], // Change this based on which user is logged in
        users: this.users,
        posts: this.posts,
        showExpandedPost: false,
        expandedPost: {},
        creatingNewPost: false
    }

    componentDidUpdate() {
        // Reset home page when browswer back button is pressed
        window.onpopstate = () => {
            this.handleBackToHome();
        }
    }

    // Add /home the browser history so the browser back button doesn't take the 
    // user back to the login page after expanding a post or creating a new post
    handleBrowserBackButton = () => {
        this.props.history.push('/home');
    }

    handleExpandPost = post => {
        // console.log('expand post')
        // console.log(post)
        this.handleBrowserBackButton();
        this.setState({
            showExpandedPost: true,
            expandedPost: post
        })
    }

    handleOpenPostCreator = () => {
        // console.log('open new post form')
        this.handleBrowserBackButton();
        this.setState({
            creatingNewPost: true
        })
    }

    handleBackToHome = () => {
        // console.log('back to home')
        this.setState({
            showExpandedPost: false,
            expandedPost: {},
            creatingNewPost: false
        })
    }

    handleCreateNewPost = (newPost) => {
        const newPosts = this.state.posts;
        newPosts.push(newPost)
        this.setState({
            posts: newPosts
        });
        this.handleBackToHome();
    }
    
    render() { 
        const {user, posts, showExpandedPost, expandedPost, creatingNewPost} = this.state;

        return (  
            <div>
                <UserTopBar user={user} />

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