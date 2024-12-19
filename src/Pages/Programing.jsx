import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Stack, Alert, Spinner, Pagination } from "react-bootstrap";
import { addArticle } from "../slice/savedSlice";
import { useDispatch } from 'react-redux';
import useTechnology from "../hooks/useTechnology";

function Programming() {
    const dispatch = useDispatch();

    const {
        beritaProgramming = [], // Default value jika undefined
        isLoading,
        alertMessage,
        showAlert,
        setShowAlert,
        setAlertMessage,
    } = useTechnology();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil((beritaProgramming?.length || 0) / itemsPerPage); // Hindari error jika undefined

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentArticles = beritaProgramming?.slice(indexOfFirstItem, indexOfLastItem) || []; // Default empty array

    const handleSave = (berita) => {
        dispatch(addArticle({
            title: berita.title,
            abstract: berita.abstract,
            multimedia: berita.multimedia,
            url: berita.url,
            published_date: berita.published_date,
        }));
        setAlertMessage(`Article "${berita.title}" Successfully saved!`);
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
            {isLoading ? (
                <div className="d-flex justify-content-center min-vh-100">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Row>
                        {currentArticles.map((item, index) => (
                            <Col md={4} key={index}>
                                <Card className="mb-4">
                                    <Card.Img
                                        variant="top"
                                        src={
                                            item.multimedia && item.multimedia.length > 0
                                                ? item.multimedia[0].url
                                                : "https://via.placeholder.com/300x200"
                                        }
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <Card.Title className="text-truncate">{item.title}</Card.Title>
                                        <Card.Text className="text-truncate">{item.abstract}</Card.Text>
                                        <Stack direction="horizontal" gap={3}>
                                            <Button className="p-2" variant="primary" href={item.url} target="_blank">
                                                See More
                                            </Button>
                                            <Button className="p-2" variant="success" onClick={() => handleSave(item)}>Save</Button>
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
            )}
        </Container>
    );
}

export default Programming;
