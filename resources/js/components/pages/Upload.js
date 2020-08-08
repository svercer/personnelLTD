import React, { Component } from 'react'
import { Container, Row, Col, Card, Form, Button, FormLabel, FormControl, Alert, ProgressBar } from 'react-bootstrap'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileHeader: false,
            csv: '',
            errorCsv: "",
            successCsv: "",
            show: false,
            uploadPercent: 0,
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
        if (this.state.csv == "") {
            this.setState({
                errorCsv: "File is required",
            })
            return
        }

        const { fileHeader, csv } = this.state
        let credentials = new FormData();
        credentials.append('fileHeader', fileHeader)
        credentials.append('csv', csv, csv.name )

        const option = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor( ( loaded * 10 ) / total)
                if ( percent < 100) {
                    this.setState({ uploadPercent: percent })
                }
            }
        }

        Axios.post("/api/add-csv/", credentials, option, {
            headers: {
                "Content-Type": "Application/json",
                'Accept': '*/*',
            }
        })
        .then(res => {
            if (res.data.success == 200) {
                this.setState({
                    successCsv: "Successfully uploaded",
                    errorCsv: "",
                    uploadPercent: 100
                }, () => {
                    setTimeout(() => {
                        this.setState({ uploadPercent : 0})
                    }, 1000)
                })
                setTimeout(  () => this.props.history.push("/view-all?page=1"), 2000 )
            } else if (res.data.error == "validation") {
                this.setState({
                    successCsv: "",
                    errorCsv: res.message,
                })
            }
        }).catch(res => console.log("res:", res))
    }

    render() {
        const { uploadPercent } = this.state
        return (
            <Container className="margin-top-50" style={{minHeight: '60vh'}}>
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
                                        { uploadPercent > 0 && <ProgressBar animated className="my-3" striped now={uploadPercent} label={`${uploadPercent}%`}  /> }
                                        {this.state.errorCsv !== '' &&
                                            <Alert
                                                className="my-2"
                                                variant="danger">
                                                {this.state.errorCsv}
                                            </Alert>
                                        }
                                        {this.state.successCsv !== '' &&
                                            <Alert
                                                className="my-3"
                                                variant="success">
                                                    {this.state.successCsv}
                                            </Alert>}
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
export default withRouter(Upload)
