import React from "react";
import { Container, Row,Col, Link} from "react-bootstrap";



function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>Explore DetikX</h5>
                        <ul className="list-unstyled d-flex">
                            <li className="me-3">
                                <Link to="/home" className="text-white text-decoration-none">
                                    Home
                                </Link>
                            </li>
                            <li className="me-3">
                                <Link to="/investigasi" className="text-white text-decoration-none">
                                    Investigasi
                                </Link>
                            </li>
                            <li className="me-3">
                                <Link to="/spotlight" className="text-white text-decoration-none">
                                    Spotlight
                                </Link>
                            </li>
                            <li className="me-3">
                                <Link to="/intermeso" className="text-white text-decoration-none">
                                    Intermeso
                                </Link>
                            </li>
                            <li className="me-3">
                                <Link to="/crimestory" className="text-white text-decoration-none">
                                    Crimestory
                                </Link>
                            </li>
                            <li>
                                <Link to="/indeks" className="text-white text-decoration-none">
                                    Indeks
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col md={6} className="text-end">
                        <h5>Find us here</h5>
                        <div className="d-flex justify-content-end">
                            <a href="#" className="text-white me-3">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="text-white me-3">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12} className="text-center">
                        <small>
                            Copyright © 2024 detikcom, All right reserved ·{" "}
                            <a href="#" className="text-warning text-decoration-none">
                                Redaksi
                            </a>{" "}
                            ·{" "}
                            <a href="#" className="text-warning text-decoration-none">
                                Pedoman Media Siber
                            </a>{" "}
                            ·{" "}
                            <a href="#" className="text-warning text-decoration-none">
                                Karir
                            </a>{" "}
                            ·{" "}
                            <a href="#" className="text-warning text-decoration-none">
                                Kotak Pos
                            </a>{" "}
                            ·{" "}
                            <a href="#" className="text-warning text-decoration-none">
                                Info Iklan
                            </a>{" "}
                            ·{" "}
                            <a href="#" className="text-warning text-decoration-none">
                                Privacy Policy
                            </a>{" "}
                            ·{" "}
                            <a href="#" className="text-warning text-decoration-none">
                                Disclaimer
                            </a>
                        </small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};


export default Footer;