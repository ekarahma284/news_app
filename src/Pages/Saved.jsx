import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { removeArticle } from "../slice/savedSlice";

function Save() {
    const savedArticles = useSelector((state) => state.savedArticles);
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false); // State untuk mengontrol alert
    const [alertMessage, setAlertMessage] = useState(""); // Pesan untuk alert

    const handleRemove = (index) => {
        const articleToRemove = savedArticles[index]; // Artikel yang akan dihapus
        dispatch(removeArticle(index)); // Hapus artikel dari Redux state
        setAlertMessage(`Berita "${articleToRemove.title}" berhasil dihapus!`); // Set pesan alert
        setShowAlert(true); // Tampilkan alert
        setTimeout(() => setShowAlert(false), 2000); // Sembunyikan alert setelah 2 detik
    };

    return (
        <Container className="my-4">
            {/* Alert yang bersifat global */}
            {showAlert && (
                <Alert
                    variant="danger"
                    className="mb-4"
                >
                    {alertMessage}
                </Alert>
            )}

            <Row>
                <h1>Saved Articles</h1>
                {savedArticles.length > 0 ? (
                    savedArticles.map((article, index) => (
                        <Col md={4} key={index}>
                            <Card className="mb-4">
                                <Card.Img
                                    variant="top"
                                    src={article.multimedia?.[0]?.url}
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>{article.title}</Card.Title>
                                    <Button
                                        variant="primary"
                                        href={article.url}
                                        target="_blank"
                                    >
                                        Selengkapnya
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="ms-2"
                                        onClick={() => handleRemove(index)}
                                    >
                                        Remove
                                    </Button>
                                    <br />
                                    <small className="text-muted">{article.published_date}</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No articles saved yet.</p>
                )}
            </Row>
        </Container>
    );
}

export default Save;
