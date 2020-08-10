import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Error = () => {
    return (
        <Container className="margin-top-50" fluid>
            <Row className=" justify-content-center">
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <h1>ERROR 404</h1>
                    <h2><a href="/" >Go to Home Page</a></h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Error
