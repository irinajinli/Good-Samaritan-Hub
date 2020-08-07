import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import PostList from '../PostList';

import { getAllUsers } from '../../actions/user';
import { getMatchingUsers } from '../../actions/search';
import UserSearchResult from './UserSearchResult';

import './styles.css';
import '../../index.css';

class SearchResults extends Component {
    state = {  
        matchingUsers: []
    };

    updateUserResults() {
        getMatchingUsers(this.props.searchTerm)
            .then(matchingUsers => {
                this.setState({ 
                    matchingUsers
                });
            })
            .catch(error => {
                console.log('Could not get users');
                this.setState({ 
                    matchingUsers: [] 
                });
            })
    }

    componentDidMount() {
        this.updateUserResults();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.updateUserResults();
        }
    }

    render() { 
        const { matchingUsers } = this.state;
        const { user, users, searchTerm, expandedPost, targetLocation, showExpandedPost, handleExpandPost, handleGoToProfile, 
            handleBackToSearchResults, handleChangeTargetLocation, handleHidePostFromUser, handleGoToInboxFromPost} = this.props;

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
                    targetLocation={targetLocation}
                    restrictPostsToTargetLocation={true}
                    searchTerm={searchTerm}
                    handleExpandPost={handleExpandPost} 
                    showExpandedPost={showExpandedPost} 
                    expandedPost={expandedPost}
                    handleChangeTargetLocation={handleChangeTargetLocation}
                    handleBack={handleBackToSearchResults}
                    handleHidePostFromUser={handleHidePostFromUser}
                    handleGoToProfile={handleGoToProfile}
                    handleGoToInboxFromPost={handleGoToInboxFromPost}
                />
            </div>
        );
    }
}
 
export default SearchResults;