import React, { Component } from 'react';
import { uid } from "react-uid";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Post from '../Post'
import './styles.css'

class PostList extends Component {
    isAnyType = () => true;

    isAnOffer = post => { return post.type === 'Offer'; }

    isARequest = post => { return post.type === 'Request'; }

    state = {
        filterCondition: this.isAnyType
    }

    getBtnClass = type => {
        const {filterCondition} = this.state;
        if ((type === 'all' && filterCondition === this.isAnyType) || 
        (type === 'offers' && filterCondition === this.isAnOffer) ||
        (type === 'requests' && filterCondition === this.isARequest)) {
            return 'post-list__filter-btn post-list__filter-btn--selected';
        }
        return 'post-list__filter-btn';
    }

    showAll = () => {
        this.setState({
            filterCondition: this.isAnyType
        });
    }

    showOnlyOffers = () => {
        this.setState({
            filterCondition: this.isAnOffer
        });
    }

    showOnlyRequests = () => {
        this.setState({
            filterCondition: this.isARequest
        });
    }

    onReportPost = post => {
        const { handleReportPost, handleBack } = this.props;
        handleReportPost(post);
        handleBack();
    }

    onRemovePost = post => {
        const { deactivatePost, handleBack } = this.props;
        deactivatePost(post);
        handleBack();
    }

    render() { 
        const {filterCondition} = this.state;
        const {user, posts, handleExpandPost, showExpandedPost, expandedPost, 
            handleBack, recentlyReportedPosts, handleGoToProfile } = this.props;
        
        return (  
            <div >
                {!showExpandedPost && 
                <div >
                    <ButtonGroup className='post-list__filter-btn-group'
                        orientation="horizontal"
                        color="primary"
                        aria-label="vertical contained primary button group"
                        variant="text"
                    >
                        <Button size="small" name='all' className={this.getBtnClass('all')} 
                            onClick={this.showAll}>All</Button>
                        <Button size="small" name='offers' className={this.getBtnClass('offers')}
                            onClick={this.showOnlyOffers}>Offers</Button>
                        <Button size="small"  name='requests' className={this.getBtnClass('requests')}
                            onClick={this.showOnlyRequests}>Requests</Button>
                    </ButtonGroup>
                </div>}

                <div className='post-list__container'>
                    {!showExpandedPost && posts.filter(post => {
                        return (
                            filterCondition(post) &&
                            !recentlyReportedPosts.includes(post) &&
                            post.status === 'active'
                        );
                    }).map(post => (
                        <Post 
                            key={uid(post)}
                            user={user}
                            post={post}
                            isExpanded={showExpandedPost}
                            handleExpandPost={handleExpandPost}
                            handleBack={handleBack}
                            handleReportPost={this.onReportPost}
                            handleGoToProfile={handleGoToProfile}
                            deactivatePost={this.onRemovePost}
                        />
                    ))}
                    {showExpandedPost && 
                        <Post 
                            user={user}
                            post={expandedPost}
                            isExpanded={showExpandedPost}
                            handleExpandPost={handleExpandPost}
                            handleBack={handleBack}
                            handleReportPost={this.onReportPost}
                            handleGoToProfile={handleGoToProfile}
                            deactivatePost={this.onRemovePost}
                        />
                    }
                </div>
            </div>
        );
    }
}
 
export default PostList;