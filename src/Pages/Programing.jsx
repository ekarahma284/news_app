import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
function Programing() {
    const [beritaProgramming, setberitaProgramming] = useState([])

    useEffect(() => {
        fetch("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=ftmLzO39nIIsE4BUruG9PayJCjvRkI2U")
            .then((response) => response.json())
            .then((data) => setberitaProgramming(data))
            .catch((error) => console.error("Error fetching berita utama:", error));
    })

    return (
        <Container className="my-4">
            <Row>
                {beritaProgramming.results?.map((berita, index) => (
                    <Col md={4} key={index}>
                        <Card className="mb-4">
                            <Card.Img 
                                variant="top"
                                src={berita.multimedia?.[0]?.url}
                                style={{ height: '300px', objectFit: 'cover' }}
                                // alt={berita.title}
                            />
                            <Card.Body>
                                <Card.Title>{berita.title}</Card.Title>
                                {/* <Card.Text className="text-truncate" style={{ maxHeight: "3rem", overflow: "hidden" }}>{berita.abstract}</Card.Text> */}
                                <Button variant="primary" href={berita.url}>Selengkapnya</Button>
                                <br />
                                <small className="text-muted">{berita.published_date}</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    );
}
export default Programing