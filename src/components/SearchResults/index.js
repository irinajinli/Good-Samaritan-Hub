import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
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
        if (prevProps !== this.props) {
            this.updateResults();
        }
    }

    render() { 
        const { matchingPosts, matchingUsers } = this.state;
        const { homeComponent } = this.props;

        return (  
            <div>
                {/* User search results */}
                {!homeComponent.state.showExpandedPost &&
                <div><Chip className='search-results__section-title' label='Users'></Chip></div>}
                {!homeComponent.state.showExpandedPost && 
                matchingUsers.map(user => (
                    <UserSearchResult 
                        key={uid(user)}
                        user={user}
                        handleGoToProfile={homeComponent.handleGoToProfile}
                    />
                ))}

                {/* Post search results */}
                {!homeComponent.state.showExpandedPost &&
                <div><Chip className='search-results__section-title' label='Posts'></Chip></div>}
                <PostList 
                    user={homeComponent.props.user}
                    posts={matchingPosts} 
                    handleExpandPost={homeComponent.handleExpandPost} 
                    showExpandedPost={homeComponent.state.showExpandedPost} 
                    expandedPost={homeComponent.state.expandedPost}
                    handleBack={homeComponent.handleBackToSearchResults}
                    handleReportPost={homeComponent.handleReportPost}
                    recentlyReportedPosts={homeComponent.state.recentlyReportedPosts}
                    handleGoToProfile={homeComponent.handleGoToProfile}
                    deactivatePost={homeComponent.handleDeactivatePost}
                />
            </div>
        );
    }
}
 
export default SearchResults;