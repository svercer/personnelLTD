import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TableView from './TableView'
const Employee = ({data}) => {
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
                    <div className="graph">

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
