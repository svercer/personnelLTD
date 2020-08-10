import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Row, Col, Spinner, Tab } from 'react-bootstrap'
import TableView from '../layouts/TableView';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string'

export default class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            error: "",
            loaded: false
        }
        this.getEmployees = this.getEmployees.bind(this)
        this.changePage = this.changePage.bind(this)
    }

    async getEmployees(page) {
        await Axios.get(`/api/get-all-employees?page=${page}`)
        .then(res => {
            if ( res.data.success === 200 ) {
                this.setState({users: res.data.employees, loaded: true})
                console.log('data',res.data.employees)
            } else if(res.data.error === 400) {
                this.setState({error: res.data.message, loaded: true })
            }
        }).catch(res => console.log(res))
    }

    componentDidMount() {
        // this.setState({loaded: false})
        let s = queryString.parse(this.props.location.search)
        this.getEmployees(s.page)
        console.log(this.state)
    }
    changePage(event, value){
        this.getEmployees(value)
        this.props.history.push(`/view-all?page=${value}`)
        window.scrollTo(0, 0)
    }



    render() {
        if (!this.state.loaded) {
            return (
            <Container className="margin-top-50" style={{minHeight: "60vh"}}>
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
            <Container className="margin-top-50">
                
                <Row>
                    <Col>
                        <TableView employees={this.state.users.data}/>
                        <Row className='justify-content-center my-5'>
                            <Col className="d-flex justify-content-center">
                                <Pagination
                                    count={this.state.users.last_page}
                                    color="secondary"
                                    page={this.state.users.current_page}
                                    onChange={this.changePage}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}
