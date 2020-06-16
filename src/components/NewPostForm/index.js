import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './styles.css'

class NewPostForm extends Component {
    state = {  }

    render() { 
        const {handleBackToHome} = this.props;

        return (  
            <div>
                <Button id='home__create-post-btn'
                        onClick={() => handleBackToHome()}>
                        <ArrowBackIcon />{'\u00A0'}Nevermind
                </Button>
                <div className='new-post__input'>
                    <TextField 
                        id="standard-basic" 
                        label="Title"
                        fullWidth={true} 
                    />
                </div>
                <div className='new-post__input'>
                    <TextField
                        id="standard-textarea"
                        label="Body"
                        placeholder="Placeholder"
                        multiline
                        fullWidth={true}
                    />
                </div>
            </div>
        );
    }
}
 
export default NewPostForm;