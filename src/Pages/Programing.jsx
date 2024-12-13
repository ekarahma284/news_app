import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Stack, Alert, Spinner } from "react-bootstrap";
import { addArticle } from "../slice/savedSlice";
import { useDispatch } from 'react-redux';

function Programming() {
    const [beritaProgramming, setBeritaProgramming] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            fetch("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=ftmLzO39nIIsE4BUruG9PayJCjvRkI2U")
                .then((response) => response.json())
                .then((data) => {
                    setBeritaProgramming(data.results); // Data disimpan ke `results`
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching berita utama:", error);
                    setIsLoading(false);
                });
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    const handleSave = (berita) => {
        dispatch(addArticle({
            title: berita.title,
            abstract: berita.abstract,
            multimedia: berita.multimedia,
            url: berita.url,
            published_date: berita.published_date,
        }));
        setAlertMessage(`Berita "${berita.title}" berhasil disimpan!`);
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
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row>
                    {beritaProgramming.map((item, index) => (
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
                                            Selengkapnya
                                        </Button>
                                        <Button className="p-2" variant="success" onClick={() => handleSave(item)}>Simpan</Button>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Programming;
