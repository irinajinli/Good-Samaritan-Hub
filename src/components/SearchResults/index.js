import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import PostList from '../PostList';

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
            matchingPosts: getMatchingPosts(this.props.searchTerm, this.props.posts),
            matchingUsers: getMatchingUsers(this.props.searchTerm, this.props.users)
        });
    }

    componentDidMount() {
        this.updateResults();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateResults();
        }
    }

    render() { 
        const { matchingPosts, matchingUsers } = this.state;
        const { user, expandedPost, recentlyReportedPosts, targetLocation, showExpandedPost, handleExpandPost, handleGoToProfile, 
            handleBackToSearchResults, handleChangeTargetLocation, handleReportPost, handleDeactivatePost } = this.props;

        return (  
            <div>
                {/* User search results */}
                {!showExpandedPost &&
                <div><Chip className='search-results__section-title' label='Users'></Chip></div>}
                {!showExpandedPost && 
                matchingUsers.map(user => (
                    <UserSearchResult 
                        key={user.username}
                        user={user}
                        handleGoToProfile={handleGoToProfile}
                    />
                ))}

                {/* Post search results */}
                {!showExpandedPost &&
                <div><Chip className='search-results__section-title' label='Posts'></Chip></div>}
                <PostList 
                    user={user}
                    posts={matchingPosts} 
                    targetLocation={targetLocation}
                    handleExpandPost={handleExpandPost} 
                    showExpandedPost={showExpandedPost} 
                    expandedPost={expandedPost}
                    handleChangeTargetLocation={handleChangeTargetLocation}
                    handleBack={handleBackToSearchResults}
                    handleReportPost={handleReportPost}
                    recentlyReportedPosts={recentlyReportedPosts}
                    handleGoToProfile={handleGoToProfile}
                    deactivatePost={handleDeactivatePost}
                />
            </div>
        );
    }
}
 
export default SearchResults;