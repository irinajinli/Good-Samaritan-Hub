import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import './styles.css'

class Landing extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <div>
                    <Link className='link' to={'/login'}>
                        <Button variant='outlined' color='primary'>Login</Button>
                    </Link>
                </div>
                <div>
                    <Link className='link' to={'/registration'}>
                        <Button variant='outlined' color='primary'>Register</Button>
                    </Link>
                </div>
            </div>
        );
    }
}
 
export default Landing;