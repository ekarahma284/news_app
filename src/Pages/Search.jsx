import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Stack, Alert, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../slice/searchSlice";
import { addArticle } from '../slice/savedSlice';
import useSearch from "../hooks/useSearch"; // Import custom hook

function Search() {
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

    // Panggil custom hook useSearch
    const { beritaSearch, isLoading, showAlert, alertMessage, setShowAlert,setAlertMessage } = useSearch(query, dispatch, setSearchResults);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(beritaSearch.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentArticles = beritaSearch.slice(indexOfFirstItem, indexOfLastItem);

    const handleSave = (berita) => {
        let multimedia = [];
        if (berita && berita.multimedia != null && berita.multimedia.length > 0) {
            multimedia = berita.multimedia;
        } else {
            multimedia.push({ url: "kosong" });
        }

        const urls = multimedia.map((item) => {
            return {
                url: item.url === "kosong"
                    ? "https://awsimages.detik.net.id/community/media/visual/2022/07/13/ilustrasi-baca-berita_169.jpeg?"
                    : "https://www.nytimes.com/" + item.url,
            };
        });

        dispatch(addArticle({
            title: berita.headline.main,
            abstract: berita.abstract,
            multimedia: urls,
            url: berita.web_url,
            published_date: berita.pub_date,
        }));
        setAlertMessage(`Berita "${berita.headline.main}" berhasil disimpan!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    return (
        <Container className="my-4">
            {showAlert && (
                <Alert
                    variant="success"
                    onClose={() => setShowAlert(false)}
                    dismissible
                    className="mb-4"
                >
                    {alertMessage}
                </Alert>
            )}
            <h2>Search Results for "{query}"</h2>
            {isLoading ? (
                <div className="d-flex justify-content-center min-vh-100">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                results.length > 0 ? (
                    <>
                        <Row>
                            {currentArticles.map((article, index) => (
                                <Col md={4} key={index}>
                                    <Card className="mb-4">
                                        <Card.Img
                                            variant="top"
                                            src={
                                                article.multimedia && article.multimedia.length > 0
                                                    ? `https://www.nytimes.com/${article.multimedia[0].url}`
                                                    : "https://awsimages.detik.net.id/community/media/visual/2022/07/13/ilustrasi-baca-berita_169.jpeg"
                                            }
                                            style={{ height: "200px", objectFit: "cover" }}
                                            alt={article.headline?.main || "Image not available"}
                                        />
                                        <Card.Body>
                                            <Card.Title className="text-truncate">{article.headline?.main || "No title available"}</Card.Title>
                                            <Card.Text className="text-truncate">{article.abstract || "No description available"}</Card.Text>
                                            <Stack direction="horizontal" gap={3}>
                                                <Button className="p-2" variant="primary" href={article.url} target="_blank">
                                                    Selengkapnya
                                                </Button>
                                                <Button className="p-2" variant="success" onClick={() => handleSave(article)}>Simpan</Button>
                                            </Stack>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Pagination className="justify-content-center">
                            <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
                        </Pagination>
                    </>
                ) : (
                    <div className="d-flex justify-content-center min-vh-100">
                        <p>No results found for "{query}".</p>
                    </div>
                )
            )}
        </Container>
    );
}

export default Search;
