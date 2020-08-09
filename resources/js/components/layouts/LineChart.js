import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';


export default class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            average: "",
            total: "",
        }
    }

    componentDidMount() {
        this.setState({
            average: this.props.average,
            total: this.props.total
        })
    }
    render() {
        const data = {
            labels: ["1", "2", "3", "4"],
            datasets: [
                {
                    label: "Average",
                    backgroundColor: "rgba(255,0,255,0.75)",
                    data: [ (this.props.average / 4) *10 ,(this.props.average / 3)*10 , (this.props.average / 2)*10 , this.props.average*10 ]
                },
                {
                    label: "Total",
                    backgroundColor: "rgba(0,255,0,0.75)",
                    data: [this.props.total /4 ,this.props.total /3 ,this.props.total /2 ,this.props.total]
                },
            ]
        }
        return (
            <Container>
                <Row>
                    <Col>
                        Graph
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Line
                            options={{
                                responsive: true,
                            }}
                            data={data}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}





