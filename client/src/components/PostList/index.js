import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Chip from '@material-ui/core/Chip';

import Post from '../Post'
import './styles.css'
import '../../index.css'

import { getPostalCodes } from '../../actions/location';
import { sortByDate } from '../../actions/sort';
import { getNearbyLocations } from '../../actions/distance';
import { getPostsByLocation, getMatchingPosts, getPostsByUser } from '../../actions/search';
import { reportPost, deactivatePost } from '../../actions/post';

class PostList extends Component {
    isAnyType = () => true;

    isAnOffer = post => post.type === 'Offer';

    isARequest = post => post.type === 'Request';

    state = {
        posts: [],
        filterCondition: this.isAnyType,
        newestOrOldestFirst: 'newest first',
        postalCodes: {}
    }

    updatePostsToDiplay = () => {
        const { filterCondition, newestOrOldestFirst } = this.state;
        const { recentlyReportedPosts, restrictPostsToTargetLocation, targetLocation, searchTerm,
            showInactivePosts, restrictPostsToUser, displayedUser, user } = this.props;

        if (restrictPostsToTargetLocation) {

            // Get posts matching the current target location
            getPostsByLocation(targetLocation)
                .then(posts => {
                    // Filter posts
                    posts = posts.filter(post => {
                        return filterCondition(post) && !recentlyReportedPosts.includes(post._id)
                            && (showInactivePosts? true : post.status === 'active');
                    });
                    if (searchTerm !== undefined) {
                        posts = getMatchingPosts(searchTerm, posts);
                    }

                    // Sort posts by date
                    posts = sortByDate(posts, newestOrOldestFirst);

                    this.setState({
                        posts
                    }); 
                })
                .catch(error => {
                    console.log('Could not get posts');
                    this.setState({
                        posts: []
                    });
                })

        } else if (restrictPostsToUser) {

            // Get the displayed user's posts
            getPostsByUser(displayedUser)
                .then(posts => {
                    // Filter posts
                    posts = posts.filter(post => {
                        return filterCondition(post) && !recentlyReportedPosts.includes(post._id)
                            && ((displayedUser.username !== user.username)? post.status === 'active' : true);
                    });

                    // Sort posts by date
                    posts = sortByDate(posts, newestOrOldestFirst);

                    this.setState({
                        posts
                    });
                })
                .catch(error => {
                    this.setState({
                        posts: [] 
                    });
                });

        }
    }

    componentDidMount() {
        if (this.props.restrictPostsToTargetLocation) {
            getPostalCodes()
                .then(postalCodes => {
                    this.setState({
                        postalCodes
                    });
                })
                .catch(error => {
                    console.log('Could not get postal codes')
                    this.setState({
                        postalCodes: {}
                    });
                })
        }
        
        this.updatePostsToDiplay();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.targetLocation !== this.props.targetLocation
            || prevProps.recentlyReportedPosts !== this.props.recentlyReportedPosts
            || prevProps.searchTerm !== this.props.searchTerm) {
            this.updatePostsToDiplay();
        }
    }

    showNearbyLocations = () => {
        const { postalCodes } = this.state;
        const { targetLocation } = this.props;
        const nearbyLocations = getNearbyLocations(targetLocation, postalCodes);
        return (
            <div className='post-list__location-card-content post-list--center'>
                <div>
                    <div className='post-list__underline'>Try locations near {targetLocation}:</div>
                    <div className='post-list--center'>
                        <ul className='post-list__ul'>
                            {nearbyLocations.length > 0 && <li><div>{nearbyLocations[1].postalCode} - {Math.round(nearbyLocations[1].distance * 10) / 10} km</div></li>}
                            {nearbyLocations.length > 1 && <li><div>{nearbyLocations[2].postalCode} - {Math.round(nearbyLocations[2].distance * 10) / 10} km</div></li>}
                            {nearbyLocations.length > 2 && <li><div>{nearbyLocations[3].postalCode} - {Math.round(nearbyLocations[3].distance * 10) / 10} km</div></li>}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    handleTargetLocationChange = (event, values) => {
        this.props.handleChangeTargetLocation(values);
    };

    handleChangeSortingOption = (event, values) => {
        if (values === 'Date: newest first') {
            values = 'newest first';
        } else { // values === 'Date: oldest first'
            values = 'oldest first';
        }
        this.setState({ 
            newestOrOldestFirst: values 
        }, 
        this.updatePostsToDiplay);
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
        },
        this.updatePostsToDiplay);
    }

    showOnlyOffers = () => {
        this.setState({
            filterCondition: this.isAnOffer
        },
        this.updatePostsToDiplay);
    }

    showOnlyRequests = () => {
        this.setState({
            filterCondition: this.isARequest
        },
        this.updatePostsToDiplay);
    }

    getNullStateLabel = () => {
        if (this.state.filterCondition === this.isAnyType) {
            return 'No offers or requests';
        } else if (this.state.filterCondition === this.isAnOffer) {
            return 'No offers';
        } else {
            return 'No requests';
        }
    }

    onReportPost = post => {

        // Report the post
        reportPost(post)
            .then(reportedPost => {
                console.log(reportedPost); // TODO: remove later
                this.props.handleReportPost(reportedPost);
                this.props.handleBack();
            })
            .catch(error => {
                alert('Unable to report post. Please try again');
            })
    }

    onRemovePost = post => {

        deactivatePost(post)
            .then(deactivatedPost => {
                console.log(deactivatedPost); // TODO: remove later
                this.updatePostsToDiplay();
                this.props.handleBack();
            })
            .catch(error => {
                alert('Unable to deactivate post. Please try again');
            })
        
    }

    render() { 
        const { posts, postalCodes } = this.state;
        const { user, users, restrictPostsToTargetLocation, restrictPostsToUser, targetLocation, handleExpandPost, showExpandedPost, 
            expandedPost, handleBack, handleGoToProfile, handleGoToInboxFromPost } = this.props;
        
        return (  
            <div >
                {posts.length === 0 && restrictPostsToUser &&
                <Card className='post-list__header-card'>
                    <h1>User has not posted</h1>
                </Card>}
                {(posts.length > 0 || restrictPostsToTargetLocation) &&
                <React.Fragment>
                    {!showExpandedPost && 
                    <div className='post-list__filter-btn-group'>
                            <Card className='post-list__header-card'>
                                <div className='post-list__header-card-content'>
                                    {restrictPostsToTargetLocation && 
                                    <div>
                                        <LocationOnIcon className='post-list__location-icon'/>
                                        <span className='post-list__header-label'>Location:</span>
                                        <div className='post-list__selector'>
                                            <Autocomplete
                                                defaultValue={targetLocation}
                                                disableClearable
                                                onChange={this.handleTargetLocationChange}
                                                options={Object.keys(postalCodes)}
                                                renderInput={(params) => <TextField {...params}/>}
                                            />
                                        </div>
                                    </div>}
                                    {!restrictPostsToTargetLocation && 
                                        <h1 className='post-list__header-label bold'>Posts</h1>}
                                    <div className='float-right'>
                                        <span className='post-list__header-label'>Sort by:</span>
                                        <Autocomplete
                                            className='post-list__selector padding-right'
                                            style={{ width: 165 }}
                                            defaultValue={'Date: newest first'}
                                            disableClearable
                                            onChange={this.handleChangeSortingOption}
                                            options={['Date: newest first', 'Date: oldest first']}
                                            renderInput={(params) => <TextField {...params}/>}
                                        />
                                    </div>
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
                        {!showExpandedPost && posts.length > 0 &&
                        posts.map(post => (
                            <Post 
                                key={post._id}
                                user={user}
                                users={users}
                                post={post}
                                isExpanded={showExpandedPost}
                                handleExpandPost={handleExpandPost}
                                handleBack={handleBack}
                                handleReportPost={this.onReportPost}
                                handleGoToProfile={handleGoToProfile}
                                handleGoToInboxFromPost={handleGoToInboxFromPost}
                                deactivatePost={this.onRemovePost}
                            />
                        ))}
                        {!showExpandedPost && posts.length == 0 &&
                            <Chip className='null-state-label' label={this.getNullStateLabel()}></Chip>
                        }
                        {!showExpandedPost && posts.length == 0 && restrictPostsToTargetLocation &&
                            <Card className='post-list__header-card'>
                                {this.showNearbyLocations()}
                            </Card>
                        }
                        {showExpandedPost && 
                            <Post 
                                user={user}
                                users={users}
                                post={expandedPost}
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
                </React.Fragment>}
            </div>
        );
    }
}
 
export default PostList;