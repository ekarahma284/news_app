import React from 'react';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import logo from "../Asset/Logo.png";
const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row className="md-4">
                    <Col md={4}>
                        <h5 className="text-uppercase mb-3">Related link</h5>
                        <ul className="list-unstyled">
                            <li><a href="/ind" className="text-white hover-link">Indonesian</a></li>
                            <li><a href="/programming" className="text-white hover-link">Technology</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5 className="text-uppercase mb-3">Informations</h5>
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-center mb-2">
                                <span>Jl. Pandansari-Kaligua, Kec. Paguyangan, Brebes, Jawa Tengah 52276</span>
                            </li>
                            <li>
                                <span>085876198380</span>
                            </li>
                        </ul>


                    </Col>
                    <Col md={4} className="text-end">
                        <Figure className="mb-0">
                            <Figure.Image width={150} height={150} src={logo} alt="logo" />
                        </Figure>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;
