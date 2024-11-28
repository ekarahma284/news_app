import React from "react";
import { Navbar, Container, Nav, Form, Button, Figure, Offcanvas, NavDropdown } from "react-bootstrap";
import logo from "../Asset/Logo.png";

function Header() {
    const expand = "lg";
    return (


        <header>
            <Navbar bg="primary" variant="dark" expand={expand} className="mb-3" >
                <Container fluid>
                    <Navbar.Brand href="#">
                        <Figure className="mb-0">
                            <Figure.Image
                                width={150}
                                height={150}
                                src={logo}
                                alt="logo"
                            />
                        </Figure>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Navigation Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <NavDropdown
                                    title="More"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                >
                                    <NavDropdown.Item href="/ind">Indonesia</NavDropdown.Item>
                                    <NavDropdown.Item href="/programming">Programing</NavDropdown.Item>
                                    <NavDropdown.Item href="/covid-19">Covid</NavDropdown.Item>
                                    <NavDropdown.Item href="/saved">saved</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>

                            <Form className="d-flex ms-auto mt-3 mt-lg-0">
                                <Form.Control
                                    type="text"
                                    placeholder="Search articles, news, or topics"
                                    className="shadow-sm me-2"
                                />
                                <Button type="submit" variant="danger">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
