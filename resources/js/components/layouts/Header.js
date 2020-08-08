import React from 'react'
import { Navbar, Nav, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">PersonnelLTD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="">
                    <Nav className="mr-auto d-flex ">
                        <Link className={
                            location.pathname == "/" ? "headerLinks active mr-2" : "headerLinks mr-2"}
                            to="/"
                            >Upload
                        </Link>
                        {/* <Link
                            className={location.pathname == "/upload" ? "headerLinks active mr-2" : "headerLinks mr-2"}
                            to="/home">Home
                        </Link> */}
                        <Link
                            className={location.pathname == "/view-all" ? "headerLinks active mr-2" : "headerLinks mr-2"}
                            to="/view-all">
                                View All
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(Header)
