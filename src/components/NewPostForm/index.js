import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './styles.css'
import '../../index.css'

class NewPostForm extends Component {
    state = {
        title: '',
        body: '',
        poster: this.props.user,
        type: 'Request',
        date: {},
        status: 'active'
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value // [name] sets the object property name to the value of the `name` variable.
        });
    };

    onCreateNewPost = () => {
        this.setState({
            date: new Date()
        }, () => { 
            // Put handleCreateNewPost in the callback of setState to ensure that 
            // this.state.date is updated before we call handleCreateNewPost
            this.props.handleCreateNewPost(this.state);
        });
    }

    render() { 
        const {handleBackToHome} = this.props;

        return (  
            <div >
                <Button className='new-post__back-btn'
                        onClick={() => handleBackToHome()}>
                        <ArrowBackIcon />{'\u00A0'}Nevermind
                </Button>
                <Card>
                    <div className='new-post__container'>
                        <div className='new-post__input'>
                            <TextField 
                                name='title'
                                onChange={this.handleInputChange}
                                label="Title"
                                fullWidth={true} 
                            />
                        </div>
                        <div className='new-post__input'>
                            <TextField
                                name='body'
                                onChange={this.handleInputChange}
                                label="Body"
                                placeholder="Placeholder"
                                multiline
                                fullWidth={true}
                            />
                        </div>
                        <div className='new-post__input new-post__type'>
                            {/* Note: The "index.js:1 Warning: findDOMNode is deprecated in StrictMode."
                            in the console is caused by Material UI's Select component */}
                            <Select
                                name='type'
                                value={this.state.type}
                                onChange={this.handleInputChange}
                            >
                                <MenuItem value={'Request'}>Request</MenuItem>
                                <MenuItem value={'Offer'}>Offer</MenuItem>
                            </Select>
                        </div>
                        <Button variant="outlined"
                                className='new-post__create-post-btn'
                                onClick={() => this.onCreateNewPost()}>
                                Post
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}
 
export default NewPostForm;