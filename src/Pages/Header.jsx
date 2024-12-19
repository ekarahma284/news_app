import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, Button, Figure, Offcanvas, NavDropdown } from "react-bootstrap";
import logo from "../Asset/Logo.png";

function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <Figure className="mb-0">
                            <Figure.Image width={150} height={150} src={logo} alt="logo" />
                        </Figure>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Navigation Menu</Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 fw-bold navbar-dark">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <NavDropdown title="More" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item href="/ind">Indonesian</NavDropdown.Item>
                                    <NavDropdown.Item href="/programming">Technology</NavDropdown.Item>
                                    <NavDropdown.Item href="/saved">Saved</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>

                            <Form className="d-flex xs-auto mt-5 mt-lg-1" onSubmit={handleSearch}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search articles"
                                    className="shadow-sm me-3"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button type="submit" variant="danger">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
