import React, { Component } from 'react'
import { Container, Row, Col, Card, Form, Button, FormLabel, FormControl } from 'react-bootstrap'
import Axios from 'axios'

export default class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileHeader: false,
            csv: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { type, name, checked} = e.target
        type === 'file' ? this.setState({ [name]: e.target.files[0] }):
        this.setState({
            [name]: checked
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const { fileHeader, csv } = this.state
        console.log('state', this.state)
        let credentials = new FormData();
        credentials.append('fileHeader', fileHeader)
        credentials.append('csv', csv, csv.name )

        Axios.post("/api/add-csv/", credentials, {
            headers: {
                "Content-Type": "Application/json",
                'Accept': '*/*',
            }
        })
        .then(res => {
            if (res.success === 200) {
                //
            } else {
                //
            }
        }).catch(res => console.log("res:", res))
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center my-5">
                    <Col className="d-flex justify-content-center">
                        <Card style={{ width: '18rem' }} className="w-75">
                            <Card.Body>
                                <Card.Title>Upload CSV File</Card.Title>
                                <hr />
                                <Form className="w-75" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                    <Form.Group>
                                        <FormLabel>CSV File</FormLabel>
                                        <FormControl
                                            type='file'
                                            name='csv'
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Check
                                            custom
                                            label="File have headers"
                                            type="checkbox"
                                            name="fileHeaders"
                                            // checked={this.state.headers}
                                            id="fileHeaders"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="btn btn-primary" type="submit">Submit</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
