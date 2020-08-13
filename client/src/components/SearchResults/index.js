import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import PostList from '../PostList';
import UserSearchResult from './UserSearchResult';
import { getMatchingUsers } from '../../actions/search';
import './styles.css';
import '../../index.css';

class SearchResults extends Component {
    state = {  
        page: 1,
        allMatchingUsers: [],
        matchingUsers: []
    };

    showMoreUsers = () => {
        const { page, allMatchingUsers } = this.state;

        const min = Math.min(page * 6, allMatchingUsers.length);
        this.setState({
            matchingUsers: allMatchingUsers.slice(0, min),
            page: page + 1
        })
    }

    updateUserResults() {
        getMatchingUsers(this.props.searchTerm)
            .then(matchingUsers => {
                this.setState({ 
                    allMatchingUsers: matchingUsers
                }, 
                this.showMoreUsers);
            })
            .catch(error => {
                console.log('Could not get users');
                this.setState({ 
                    allMatchingUsers: [],
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
        const { matchingUsers, allMatchingUsers } = this.state;
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
                <React.Fragment>
                    <div className='search-results__users-container'>
                        {matchingUsers.map(user => (
                                <UserSearchResult 
                                    key={user.username}
                                    user={user}
                                    handleGoToProfile={handleGoToProfile}
                                />
                            ))}
                    </div>
                    {matchingUsers.length !== allMatchingUsers.length &&
                    <div className='center'> 
                        <IconButton onClick={this.showMoreUsers} className='moreButton' size='small'>
                            <ArrowDownwardIcon />
                        </IconButton>
                    </div>}
                </React.Fragment>}
               
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