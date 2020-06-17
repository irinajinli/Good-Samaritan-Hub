import React from 'react';

import './styles.css';

function handleSelect() {
    console.log("ok");
}

function Table(props) {
    const {rows, columns} = props;
    return (
        <div className="table">
            <Header columns={columns}></Header>
            {columns && rows && rows.map((row) => {
                return (
                    <Row columns={columns} row={row}/>
                );
            })}
        </div>
    );
}

function Header(props) {
    const {columns} = props;
    return (
        <div className="header">
            {columns && columns.map((column) => {
                return (
                    <Cell cell={column.label}/>
                );
            })}
        </div>
    );
}

function Row(props) {
    const {row, columns} = props;
    return (
        <div className="row" onClick={handleSelect}>
            {columns && row && columns.map((column) => {
                const cell = row[column.id]
                return (
                    <Cell cell={cell}/>
                );
            })}
        </div>
    );
}



function Cell(props) {
    const {cell} = props;
    return (
        <div className="cell">
            {cell}
        </div>
    );
}

export default Table;