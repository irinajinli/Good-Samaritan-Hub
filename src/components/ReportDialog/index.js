import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';

import './styles.css'

class ReportDialog extends Component {
    render() { 
        const {thing, handleClose, handleReport} = this.props;
        return (
            <div>
                <Card className='reportDialog__dialog'>
                    <div className='reportDialog__title'>{`Report this ${thing}?`}</div>
                    <Button 
                        className='reportDialog__report-button'
                        variant='outlined'
                        name='report'
                        startIcon={<ReportIcon/>}
                        onClick={handleReport}>
                        Report
                    </Button>
                    <Button className='reportDialog__button' onClick={handleClose}>Cancel</Button>
                </Card>
            </div>
        );
    }
}
 
export default ReportDialog;