import React, { Component } from 'react';

import './styles.css';

class Table extends Component {
    showHeader = (columns) => {
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].showHeader) {
                return true;
            }
        }
        return false;
    }
    render() {
        /*
        How to use
        columns: array of {id: str, name: str, showHeader: bool}
        rows: array of object with ids from columns
        handleSelect: function to handle when clicked
        compareFunction: comparator function to order rows
        */
        const {columns, rows, handleSelect, compareFunction, selectedRow} = this.props;
        compareFunction && rows.sort(compareFunction);
        return (
            <div className="table">
                {this.showHeader(columns) && <Header columns={columns}></Header>}
                {columns && rows && rows.map((row) => {
                    return (
                        <Row columns={columns} row={row} handleSelect={handleSelect} rowSelected={selectedRow && selectedRow.name === row.name ?
                             true
                            : false}
                            />
                    );
                })}
            </div>
        );
    }
}

class Header extends Component {
    render() {
        const {columns} = this.props;
        return (
            <div className="table__header">
                {columns && columns.map((column) => {
                    return (
                        <Cell cell={column.showHeader ? column.label : ""}/>
                    );
                })}
            </div>
        );
    }
}

class Row extends Component {
    render() {
        const {columns, row, handleSelect, rowSelected} = this.props;
        return (
            <div className={rowSelected ? "table__row table__row-selected" : "table__row"}onClick={() => handleSelect(row)}>
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
        <div className="table__cell">
            {cell}
        </div>
    );
}

export default Table;