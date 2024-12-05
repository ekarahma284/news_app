import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Search() {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        if (query) {
            fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=ftmLzO39nIIsE4BUruG9PayJCjvRkI2U`)
                .then((response) => response.json())
                .then((data) => setResults(data.response.docs || []))
                .catch((error) => console.error("Error fetching articles:", error));
        }
    }, [query]);

    return (
        <Container className="my-4">
            <h2>Search Results for "{query}"</h2>
            <Row>
                {results.length > 0 ? (
                    results.map((article, index) => (
                        <Col md={4} key={index}>
                            <Card className="mb-4">
                                <Card.Img
                                    variant="top"
                                    src={
                                        
                                        article.multimedia && article.multimedia.length > 0
                                        ? "https://www.nytimes.com/"+article.multimedia[0].url
                                        : "https://awsimages.detik.net.id/community/media/visual/2022/07/13/ilustrasi-baca-berita_169.jpeg?"
                                    }
                                    alt={article.headline.main}
                                />
                                <Card.Body>
                                    <Card.Title>{article.headline.main}</Card.Title>
                                    <Button variant="primary" href={article.web_url}>
                                        Read More
                                    </Button>
                                    <br />
                                    <small className="text-muted">{article.pub_date}</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </Row>
        </Container>
    );
}

export default Search;
