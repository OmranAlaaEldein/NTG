import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Department: [],
            employees: [],
            modalTitle: "",
            EmployeeId: 0,
            FName: "",
            LName:"",
            MyDepartment: "",
            DateJoin: {},
            PhotoFileName:"anonymous.png",
            PhotoPath:variables.PHOTO_URL,
            PhoneNumber:"",
            Email:"",
            Address:""
        }
    }

    refreshList() {

        fetch(variables.API_URL + 'employees')
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data });
            });

        fetch(variables.API_URL + 'departments')
            .then(response => response.json())
            .then(data => {
                this.setState({ Department: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeEmployeeFName = (e) => {
        this.setState({ FName: e.target.value });
    }

    changeEmployeeLName = (e) => {
        this.setState({ LName: e.target.value });
    }
    changeDepartment = (e) => {
        this.setState({ MyDepartment:{DepartmentId:e.target.options[e.target.selectedIndex].id,DepartmentName:e.target.value} });
    }
    changeDateOfJoining = (e) => {
        this.setState({ DateJoin: e.target.value });
    }
    changePhoneNumber = (e) => {
        this.setState({ PhoneNumber: e.target.value });
    }
    changeEmail = (e) => {
        this.setState({ Email: e.target.value });
    }
    changeAddress = (e) => {
        this.setState({ Address: e.target.value });
    }
    PhotoPath = (e) => {
        this.setState({ PhotoPath: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            EmployeeId: 0,
            FName: "",
            LName: "",
            MyDepartment: "",
            DateJoin: "",
            PhoneNumber:"",
            Email:"",
            Address:"",
            PhotoFileName: "anonymous.png"
        });
    }
    editClick(emp) {
        this.setState({
            modalTitle: "Edit Employee",
            EmployeeId: emp.EmployeeId,
            FName: emp.FName,
            LName: emp.LName,
            MyDepartment: emp.MyDepartment,
            DateJoin: emp.DateJoin,
            PhotoPath: emp.PhotoPath,
            PhoneNumber:emp.PhoneNumber,
            Email:emp.Email,
            Address:emp.Address
        });
    }

    createClick() {
        fetch(variables.API_URL + 'employees', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FName: this.state.FName,
                LName: this.state.LName,
                MyDepartment: this.state.MyDepartment,
                DateJoin: this.state.DateJoin,
                PhotoPath: this.state.PhotoPath,
                PhoneNumber:this.state.PhoneNumber,
                Email:this.state.Email,
                Address:this.state.Address
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'employees/'+this.state.EmployeeId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: this.state.EmployeeId,
                FName: this.state.FName,
                LName: this.state.LName,
                MyDepartment: this.state.MyDepartment,
                DateJoin: this.state.DateJoin,
                PhotoPath: this.state.PhotoPath,
                PhoneNumber:this.state.PhoneNumber,
                Email:this.state.Email,
                Address:this.state.Address
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'employees/' + id, {
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

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'employee/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoPath: data });
            })
    }

    render() {
        const {
            Department,
            employees,
            modalTitle,
            EmployeeId,
            FName,
            LName,
            MyDepartment,
            DateJoin,
            PhotoPath,
            PhotoFileName,
            PhoneNumber,
            Email,
            Address
        } = this.state;

        return (
            <div>

                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal"onClick={() => this.addClick()}>
                    Add Employee
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                FName
                            </th>
                            <th>
                                LName
                            </th>
                            <th>
                                MyDepartment
                            </th>
                            <th>
                                DOJ
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp =>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.FName}</td>
                                <td>{emp.LName}</td>
                                <td>{emp.MyDepartment!=null?emp.MyDepartment.DepartmentName:""}</td>
                                <td>{emp.DateJoin.substring(0,10)}</td>
                                <td>{emp.Email}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1" onClick={() => this.deleteClick(emp.EmployeeId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-2 w-50 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Emp FName</span>
                                            <input type="text" className="form-control" value={FName} onChange={this.changeEmployeeFName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Emp LName</span>
                                            <input type="text" className="form-control" value={LName} onChange={this.changeEmployeeLName} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Emp PhoneNumber</span>
                                            <input type="number" className="form-control" value={PhoneNumber} onChange={this.changePhoneNumber} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Emp Email</span>
                                            <input type="email" className="form-control" value={Email} onChange={this.changeEmail} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Emp Address</span>
                                            <input type="text" className="form-control" value={Address} onChange={this.changeAddress} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">MyDepartment</span>
                                            <select className="form-select" onChange={this.changeDepartment} value={MyDepartment.DepartmentName}> {Department.map(dep => <option id={dep.DepartmentId}  > {dep.DepartmentName} </option>)}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">DOJ</span>
                                            <input type="date" className="form-control" value={typeof(DateJoin)=="string" ? DateJoin.substring(0,10):""} onChange={this.changeDateOfJoining} />
                                        </div>
                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                            src={PhotoPath + PhotoPath} />
                                        <input className="m-2" type="file" onChange={this.imageUpload} />
                                    </div>
                                </div>

                                {EmployeeId == 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()} >Create</button> : null}
                                {EmployeeId != 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()} >Update</button> : null}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}