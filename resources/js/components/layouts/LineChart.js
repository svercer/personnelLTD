import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';


export default class LineChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {
                labels: ["1" , "2", "3", "4"],
                datasets: [
                    {
                        label: "Averagage",
                        backgroundColor: "rgba(255,0,255,0.75)",
                        data: [(this.props.average/4)*100,(this.props.average/3) *100,(this.props.average/2)*100, this.props.average *100]
                    },
                    {
                        label: "Total",
                        backgroundColor: "rgba(0,255,0,0.75)",
                        data: [this.props.total/4,this.props.total/3,this.props.total/2, this.props.total]
                    },
                ]
            }
        }
    }

    componentDidMount() {
        
    }
    render() {
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
                            data={this.state.data}

                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}





