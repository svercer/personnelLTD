import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container className="mt-5 bg-info" fluid>
            <Row className="justify-content-center p-5  border-top">
                <Col>
                    <h1 className="text-center">Personnel LTD</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
