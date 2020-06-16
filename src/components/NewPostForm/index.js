import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './styles.css'

class NewPostForm extends Component {
    state = {
        title: '',
        body: '',
        poster: this.props.user,
        type: 'Request',
        date: new Date(), // today's date
        status: 'active'
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name);
        console.log(value);

        this.setState({
            [name]: value // [name] sets the object property name to the value of the `name` variable.
        });
    };

    render() { 
        const {handleBackToHome, handleCreateNewPost} = this.props;

        return (  
            <div>
                <Button id='home__create-post-btn'
                        onClick={() => handleBackToHome()}>
                        <ArrowBackIcon />{'\u00A0'}Nevermind
                </Button>
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
                <div className='home__create-post-btn'>
                <Button variant="contained"
                        onClick={() => handleCreateNewPost(this.state)}>
                        Post
                </Button>
                </div>
                
            </div>
        );
    }
}
 
export default NewPostForm;