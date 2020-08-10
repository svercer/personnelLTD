import React from 'react'
import {Table, Container, Row, Col} from "react-bootstrap"
import { each } from 'jquery'
import { Link } from 'react-router-dom'

const TableView = ({employees}) => {

    if ( !employees ) {
        return (
            <Row className="justify-content-center" style={{minHeight: "50vh"}}>
                <Col className="text-center">
                    <h1 className="text-center"> No Items to display</h1>
                </Col>
            </Row>

        )
    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Client</th>
                    <th>Client Type</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Type of Call</th>
                    <th>External Call Score</th>
                    {location.pathname == "/view-all" && <th>Action</th>}
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => {
                    return (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.User}</td>
                            <td>{employee.Client}</td>
                            <td>{employee.Client_type}</td>
                            <td>{employee.Date}</td>
                            <td>{employee.Duration}</td>
                            <td>{employee.Type_of_call}</td>
                            <td>{employee.External_call_score}</td>

                            {location.pathname == "/view-all" && <td><Link to={`/view-single-user?id=${employee.id}&range=0`}>view</Link></td>}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableView
