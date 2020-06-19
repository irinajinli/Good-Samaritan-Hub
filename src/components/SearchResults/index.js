import React, { Component } from 'react';
import PostList from '../PostList';

import { getMatchingPosts } from '../../actions/search';

import './styles.css';

class SearchResults extends Component {
    state = {  
        matchingPosts: [],
        matchingUsers: []
    };

    componentDidMount() {
        this.setState({
            matchingPosts: getMatchingPosts(this.props.searchTerm, this.props.homeComponent.props.posts),
            matchingUsers: []
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.setState({
                matchingPosts: getMatchingPosts(this.props.searchTerm, this.props.homeComponent.props.posts),
                matchingUsers: []
            });
        }
    }

    render() { 
        const { matchingPosts, matchingUsers } = this.state;
        const { homeComponent } = this.props;

        return (  
            <div>
                {!homeComponent.state.showExpandedPost &&
                <div className='search-results__posts-title'>
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