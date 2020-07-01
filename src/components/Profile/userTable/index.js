import React, { Component } from 'react';

import './styles.css';

class Table extends Component {
    render() {
        /*
        How to use
        columns: array of {id: str, name: str}
        rows: array of object with ids from columns
        */
        const {columns, rows} = this.props;
        return (
            <div className="userTable">
                {columns && rows && rows.map((row) => {
                    return (
                        <Row columns={columns} row={row}/>
                    );
                })}
            </div>
        );
    }
}

class Row extends Component {
    render() {
        const {columns, row} = this.props;
        return (
            <div className="userTable__row">
                {columns && row && columns.map((column) => {
                    const cell = row[column.id]
                    return (
                        <Cell cell={cell}/>
                    );
                })}
            </div>
        );
    }
}

function Cell(props) {
    const {cell} = props;
    return (
        <div className="userTable__cell">
            {cell}
        </div>
    );
}

export default Table;