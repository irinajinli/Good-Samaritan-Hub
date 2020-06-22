import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './styles.css'

class MyDialog extends Component {
    getIcon = () => {
        const { actionName } = this.props;
        if (actionName === 'Report') {
            return <ReportIcon/>
        } else if (actionName === 'Remove') {
            return <VisibilityOffIcon/>
        } else if (actionName === 'Log out') {
            return <ExitToAppIcon/>
        }
    }

    getButtonStyle = () => {
        const { actionName } = this.props;
        if (actionName === 'Report') {
            return 'myDialog__button myDialog__button--report'
        } else if (actionName === 'Remove') {
            return 'myDialog__button'
        } else if (actionName === 'Log out') {
            return 'myDialog__button'
        }
    }

    render() { 
        const {title, body, actionName, handleClose, handleDoAction} = this.props;
        return (
            <div>
                <Card className='myDialog__dialog'>
                    <div className='myDialog__title'>{title}</div>
                    {body !== '' && <div className='myDialog__body'>{body}</div>}
                    <Button 
                        className={this.getButtonStyle()}
                        variant='outlined'
                        name='report'
                        startIcon={this.getIcon(actionName)}
                        onClick={handleDoAction}>
                        {actionName}
                    </Button>
                    <Button className='myDialog__button' onClick={handleClose}>Cancel</Button>
                </Card>
            </div>
        );
    }
}
 
export default MyDialog;