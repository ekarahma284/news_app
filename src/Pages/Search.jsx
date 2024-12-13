import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../slice/searchSlice";

function Search() {
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const [isLoading, setIsLoading] = useState(false); // Awalnya tidak memuat

    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                setIsLoading(true); // Set status loading sebelum fetch
                try {
                    const response = await fetch(
                        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=ftmLzO39nIIsE4BUruG9PayJCjvRkI2U`
                    );
                    const data = await response.json();
                    dispatch(setSearchResults(data.response.docs || []));
                } catch (error) {
                    console.error("Error fetching articles:", error);
                    dispatch(setSearchResults([])); // Kosongkan hasil jika terjadi error
                } finally {
                    setIsLoading(false); // Set status loading selesai
                }
            };

            const delay = setTimeout(() => {
                fetchData();
            }, 1000);

            return () => clearTimeout(delay); // Bersihkan timeout
        }
    }, [query, dispatch]);

    return (
        <Container className="my-4">
            <h2>Search Results for "{query}"</h2>
            {isLoading ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row>
                    {results.length > 0 ? (
                        results.map((article, index) => (
                            <Col md={4} key={index}>
                                <Card className="mb-4">
                                    <Card.Img
                                        variant="top"
                                        src={
                                            article.multimedia && article.multimedia.length > 0
                                                ? "https://www.nytimes.com/" + article.multimedia[0].url
                                                : "https://awsimages.detik.net.id/community/media/visual/2022/07/13/ilustrasi-baca-berita_169.jpeg?"
                                        }
                                        alt={article.headline.main || "Image not available"}
                                    />
                                    <Card.Body>
                                        <Card.Title>{article.headline.main || "No title available"}</Card.Title>
                                        <Button variant="primary" href={article.web_url} target="_blank" rel="noopener noreferrer">
                                            Read More
                                        </Button>
                                        <br />
                                        <small className="text-muted">
                                            {new Date(article.pub_date).toLocaleDateString() || "No date available"}
                                        </small>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No results found for "{query}".</p>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default Search;
