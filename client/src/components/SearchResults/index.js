import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import PostList from '../PostList';

import { getMatchingPosts, getMatchingUsers } from '../../actions/search';
import UserSearchResult from './UserSearchResult';

import './styles.css';
import '../../index.css';

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
        const { user, users, searchTerm, expandedPost, recentlyReportedPosts, targetLocation, showExpandedPost, handleExpandPost, handleGoToProfile, 
            handleBackToSearchResults, handleChangeTargetLocation, handleReportPost, handleDeactivatePost, handleGoToInboxFromPost} = this.props;

        return (  
            <div>
                {!showExpandedPost &&
                <div className='search-results__title'>Showing search results for "{searchTerm}"</div>}

                {/* User search results */}
                {!showExpandedPost &&
                <div><Chip className='search-results__section-title' label='Users'></Chip></div>}
                {!showExpandedPost && matchingUsers.length > 0 &&
                matchingUsers.map(user => (
                    <UserSearchResult 
                        key={user.username}
                        user={user}
                        handleGoToProfile={handleGoToProfile}
                    />
                ))}
                {!showExpandedPost && matchingUsers.length == 0 &&
                    <div><Chip className='null-state-label' label='No users'></Chip></div>
                }

                {/* Post search results */}
                {!showExpandedPost &&
                <div><Chip className='search-results__section-title' label='Posts'></Chip></div>}
                <PostList 
                    user={user}
                    users={users}
                    showInactivePosts={false}
                    targetLocation={targetLocation}
                    restrictPostsToTargetLocation={true}
                    handleExpandPost={handleExpandPost} 
                    showExpandedPost={showExpandedPost} 
                    expandedPost={expandedPost}
                    handleChangeTargetLocation={handleChangeTargetLocation}
                    handleBack={handleBackToSearchResults}
                    handleReportPost={handleReportPost}
                    recentlyReportedPosts={recentlyReportedPosts}
                    handleGoToProfile={handleGoToProfile}
                    handleGoToInboxFromPost={handleGoToInboxFromPost}
                    deactivatePost={handleDeactivatePost}
                />
            </div>
        );
    }
}
 
export default SearchResults;