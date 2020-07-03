import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Post from '../Post'
import './styles.css'

import { getPostalCodePrefixes } from '../../resources/hardCodedData';

class PostList extends Component {
    isAnyType = () => true;

    isAnOffer = post => { return post.type === 'Offer'; }

    isARequest = post => { return post.type === 'Request'; }

    state = {
        filterCondition: this.isAnyType
    }

    handleTargetLocationChange = (event, values) => {
        this.props.handleChangeTargetLocation(values);
    };

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
        const {user, users, posts, targetLocation, handleExpandPost, showExpandedPost, expandedPost, 
            handleBack, recentlyReportedPosts, handleGoToProfile, handleGoToInboxFromPost} = this.props;
        
        return (  
            <div >
                {!showExpandedPost && 
                <div className='post-list__filter-btn-group'>
                    <Card className='post-list__location-card'>
                        <LocationOnIcon className='post-list__location-icon'/>
                        <span className='post-list__location-label'>Location:</span>
                        <div className='post-list__location-selector'>
                            <Autocomplete
                                defaultValue={targetLocation}
                                disableClearable
                                onChange={this.handleTargetLocationChange}
                                options={getPostalCodePrefixes()}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </div>
                    </Card>
                    <ButtonGroup 
                        className='post-list__filter-btn-group'
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
                    {!showExpandedPost && 
                    posts.filter(post => {
                        return (
                            filterCondition(post) &&
                            !recentlyReportedPosts.includes(post)
                        );
                    }).map(post => (
                        <Post 
                            key={post.id}
                            user={user}
                            users={users}
                            post={post}
                            targetLocation={targetLocation}
                            isExpanded={showExpandedPost}
                            handleExpandPost={handleExpandPost}
                            handleBack={handleBack}
                            handleReportPost={this.onReportPost}
                            handleGoToProfile={handleGoToProfile}
                            handleGoToInboxFromPost={handleGoToInboxFromPost}
                            deactivatePost={this.onRemovePost}
                        />
                    ))}
                    {showExpandedPost && 
                        <Post 
                            user={user}
                            users={users}
                            post={expandedPost}
                            targetLocation={targetLocation}
                            isExpanded={showExpandedPost}
                            handleExpandPost={handleExpandPost}
                            handleBack={handleBack}
                            handleReportPost={this.onReportPost}
                            handleGoToProfile={handleGoToProfile}
                            handleGoToInboxFromPost={handleGoToInboxFromPost}
                            deactivatePost={this.onRemovePost}
                        />
                    }
                </div>
            </div>
        );
    }
}
 
export default PostList;