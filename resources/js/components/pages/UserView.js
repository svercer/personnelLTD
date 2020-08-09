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
            averageScoreByRange: "",
            totalCallDurationByRange: "",
            loaded: false,
            dateRange: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.getEmployee = this.getEmployee.bind(this)
    }
    async getEmployee(id, range) {
        await Axios.get(`/api/get-single-employee/${id}/${range}`)
        .then(res => {
            if (res.data.success === 200) {
                this.setState({
                    employee: res.data.employee,
                    lastFive: res.data.lastFive,
                    average: Math.floor(res.data.averagescore),
                    averageScoreByRange: Math.floor(res.data.averageScoreByRange),
                    totalCallDurationByRange: Math.floor(res.data.totalCallDurationByRange),
                    loaded: true
                })
                this.props.history.push(`/view-single-user?id=${id}&range=${range}`)
                // console.log("employee:", this.state)
            } else if(res.data.error) {
                this.setState.apply({error: res.data.message, loaded: true})
            }
        }).catch(res => console.log(res))
    }

    componentDidMount(){
        let id = queryString.parse(this.props.location.search).id
        let range = queryString.parse(this.props.location.search).range
        this.getEmployee(id, range)
    }

    handleChange(e) {
        let id = queryString.parse(this.props.location.search).id
        const { value, name} = e.target
        this.setState({
            [name]:value
        }, () => this.getEmployee(id, this.state.dateRange)
        )
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
                        <Employee
                            data={this.state}
                            dateChange={this.handleChange}
                            average={this.state.averageScoreByRange}
                            total={this.state.totalCallDurationByRange} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
