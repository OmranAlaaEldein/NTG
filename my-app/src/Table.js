import React, { Component } from 'react';
import { Modal } from './Modal.js';
import { variables } from './Variables.js';

export class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            element: {}
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { employees: props.employees, columns: props.columns, Api: props.Api, Modals: props.Modals };
    }

    addClick() {
        this.setState({
            modalTitle: "Add Element",
            element: {}
        });
    }

    editClick(emp) {
        this.setState({
            modalTitle: "Edit Element",
            element: emp
        });
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + this.state.Api + "/" + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }
    render() {
        const {
            employees,
            columns
        } = this.state;

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {columns.map((column) => <th>{column} </th>)}
                            {this.state.Modals ? <th>Options</th> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, i) =>
                            <tr key={emp.id}>
                                {columns.map((column, j) => <td>{emp[columns[j]]}</td>)}
                                {this.state.Modals ?
                                    <td>
                                        <button type="button" className="btn btn-light mr-1" onClick={() => this.deleteClick(emp.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#TableModal" onClick={() => this.editClick(emp)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                    </td>
                                    : ""}

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}


// general componenet to table (display + delete)
//need to add modal (add+update) by (array[0][key[0]]==array[0].id)