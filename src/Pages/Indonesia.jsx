import React from "react"
// import axios from "axios"
import { useEffect, useState } from "react"

import { Container, Row, Col, Card } from "react-bootstrap";
// import Rectangle from "../Asset/Rectangle 3349.png"

function Indonesia() {

    const [movieIndonesia, setmovieIndonesia] = useState([])

    useEffect(() => {
        fetch("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=ftmLzO39nIIsE4BUruG9PayJCjvRkI2U")
            .then((response) => response.json())
            .then((data) => setmovieIndonesia(data))
            .catch((error) => console.error("Error fetching movie utama:", error));
    })

    return (
        <Container className="my-4">
            <Row>
                {movieIndonesia.results?.map((movie, index) => (
                    <Col md={4} key={index}>
                        <Card className="mb-3">
                            <Card.Img
                                variant="top"
                                src={movie.multimedia?.[0]?.url}
                                alt={movie.title}
                            />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.abstract}</Card.Text>
                                <Card.Link href={movie.url}>Selengkapnya</Card.Link>
                                <small className="text-muted">{movie.published_date}</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    );
}

export default Indonesia;