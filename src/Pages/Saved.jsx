import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { removeArticle } from "../slice/savedSlice";

function Save() {
    const savedArticles = useSelector((state) => state.savedArticles);
    console.log(savedArticles);

    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleRemove = (index) => {
        const articleToRemove = savedArticles[index];
        dispatch(removeArticle(index));
        setAlertMessage(`Article "${articleToRemove.title}" Has Been Removed!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(savedArticles.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentArticles = savedArticles.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Container className="my-4 d-flex flex-column" style={{ minHeight: "calc(100vh - 150px)" }}>
            {showAlert && (
                <Alert
                    variant="danger"
                    className="mb-4"
                >
                    {alertMessage}
                </Alert>
            )}
            <h1>Saved Articles</h1>
            <Row className="flex-grow-1">
                {currentArticles.length > 0 ? (
                    currentArticles.map((article, index) => (
                        <Col md={4} key={index}>
                            <Card className="mb-4">
                                <Card.Img
                                    variant="top"
                                    src={article.multimedia?.[0]?.url}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-truncate">{article.title}</Card.Title>
                                    <Card.Text className="text-truncate">{article.abstract}</Card.Text>
                                    <Button
                                        variant="primary"
                                        href={article.url}
                                        target="_blank"
                                    >
                                        See More
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="ms-2"
                                        onClick={() => handleRemove(index)}
                                    >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No articles saved yet.</p>
                )}
            </Row>
            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
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
            )}
        </Container>
    );
}
export default Save;
