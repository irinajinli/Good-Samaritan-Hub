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
        posts: this.posts
    }
    
    render() { 
        const {user, posts} = this.state;

        return (  
            <div>
                <UserTopBar user={user} />
                <PostList posts={user, posts}/>
            </div>
        );
    }
}
 
export default Home;