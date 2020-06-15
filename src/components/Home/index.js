import React, { Component } from 'react';

import UserTopBar from '../UserTopBar';
import PostList from '../PostList';

class Home extends Component {
    // For now, we have one user
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
        }
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
            poster: 'Bobsy Bob',
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
            poster: 'Dani Doe',
            type: 'Offer',
            date: new Date(2020, 6, 5),
            status: 'active'
        }
    ];

    state = {  
        user: this.users[0], // Change this based on which user is logged in
        posts: this.posts,
        showExpandedPost: false,
        expandedPost: {}
    }

    handleExpandPost = post => {
        console.log('expand post')
        console.log(post)
        this.setState({
            showExpandedPost: true,
            expandedPost: post
        })
    }

    handleMinimizePost = post => {
        console.log('minimize post')
        console.log(post)
        this.setState({
            showExpandedPost: false,
            expandedPost: {}
        })
    }
    
    render() { 
        const {user, posts, showExpandedPost, expandedPost} = this.state;

        return (  
            <div>
                <UserTopBar user={user} />
                <div className='home__posts-container'>
                    <PostList 
                        posts={posts} 
                        handleExpandPost={this.handleExpandPost} 
                        showExpandedPost={showExpandedPost} 
                        expandedPost={expandedPost}
                        handleMinimizePost={this.handleMinimizePost} 
                    />
                </div>
            </div>
        );
    }
}
 
export default Home;