import React, { Component } from 'react';
import PostList from '../PostList';
import { uid } from "react-uid";

import { getMatchingPosts, getMatchingUsers } from '../../actions/search';
import UserSearchResult from '../UserSearchResult';

import './styles.css';


class SearchResults extends Component {
    state = {  
        matchingPosts: [],
        matchingUsers: []
    };

    updateResults() {
        this.setState({
            matchingPosts: getMatchingPosts(this.props.searchTerm, this.props.homeComponent.props.posts),
            matchingUsers: getMatchingUsers(this.props.searchTerm, this.props.appComponent.state.users)
        });
    }

    componentDidMount() {
        this.updateResults();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.updateResults();
        }
    }

    render() { 
        const { matchingPosts, matchingUsers } = this.state;
        const { homeComponent } = this.props;
        console.log(matchingUsers);

        return (  
            <div>
                {!homeComponent.state.showExpandedPost &&
                <div className='search-results__section-title'>
                    Users
                </div>}
                {matchingUsers.map(user => (
                    <UserSearchResult 
                        key={uid(user)}
                        user={user}
                    />
                ))}

                {!homeComponent.state.showExpandedPost &&
                <div className='search-results__section-title'>
                    Posts
                </div>}
                <PostList 
                    user={homeComponent.props.user}
                    posts={matchingPosts} 
                    handleExpandPost={homeComponent.handleExpandPost} 
                    showExpandedPost={homeComponent.state.showExpandedPost} 
                    expandedPost={homeComponent.state.expandedPost}
                    handleBackToHome={homeComponent.handleBackToHome} 
                />
            </div>
        );
    }
}
 
export default SearchResults;