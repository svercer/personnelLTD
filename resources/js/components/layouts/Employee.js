import React from 'react'
import { Container, Row, Col, FormControl } from 'react-bootstrap'
import TableView from './TableView'

const Employee = ({data, dateChange}) => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <h1 className="text-center"> {data.employee}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 >Average user score: {data.average}</h2>
                </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-between">
                <Col md={6} className="">
                    <div className="graph p-2">
                        <Row className="my-4 justify-content-around align-items-center">
                            <Col>
                                Line Graph
                            </Col>
                            <Col>
                                <FormControl as="select" name="dateRange" onChange={dateChange}>
                                    <option value="0">Last week</option>
                                    <option value="1">Last Month</option>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row style={{minHeight: '30vh'}}>
                            <Col>
                                Graph will be here
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p> Average: <span className="font-weight-bold"> {data.averageScoreByRange}</span></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p> Total: <span className="font-weight-bold">{data.totalCallDurationByRange}</span></p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={6} style={{fontSize: "0.8rem"}} className="">
                    <div className="graph">
                        <TableView employees={ data.lastFive } />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Employee
