import React, { Component } from 'react'
import queryString from 'query-string';
import Axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Employee from '../layouts/Employee';

export default class UserView extends Component {
    constructor(props){
        super(props)
        this.state = {
            employee: "",
            lastFive: [],
            average: "",
            error: "",
            loaded: false
        }
    }
    async componentDidMount(){
        let id = queryString.parse(this.props.location.search).id
        Axios.get(`/api/get-single-employee/${id}`)
        .then(res => {
            if (res.data.success === 200) {
                this.setState({
                    employee: res.data.employee,
                    lastFive: res.data.lastFive,
                    average: Math.floor(res.data.averagescore),
                    loaded: true
                })
                console.log("employee:", this.state)
            } else if(res.data.error) {
                this.setState.apply({error: res.data.message, loaded: true})
            }
        }).catch(res => console.log(res))
    }



    render() {
        if (!this.state.loaded) {
            return (<Container className="margin-top-50" style={{minHeight: "60vh"}}>
                <Row className="justify-content-center">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <Spinner animation="border" role="status">
                        </Spinner>
                            <span>Loading...</span>
                    </Col>
                </Row>
            </Container>)
        }
        return (
            <Container className="margin-top-50" style={{minHeight: "60vh"}}>
                <Row>
                    <Col>
                        <Employee data={this.state} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
