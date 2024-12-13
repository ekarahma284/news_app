import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Stack, Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from 'react-redux';
import { addArticle } from "../slice/savedSlice";

function Home() {
    const [beritaHome, setBeritaHome] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=ftmLzO39nIIsE4BUruG9PayJCjvRkI2U")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.results)) {
                    setBeritaHome(data.results);
                } else {
                    console.error("Data results is not an array:", data);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching berita utama:", error);
                setIsLoading(false);
            });
    }, []);

    const handleSave = (berita) => {
        dispatch(addArticle({
            title: berita.title,
            abstract: berita.abstract,
            multimedia: berita.multimedia,
            url: berita.url,
            published_date: berita.published_date,
        }));
        setAlertMessage(`Berita "${berita.title}" berhasil disimpan!`); // Set pesan alert
        setShowAlert(true); // Tampilkan alert
        setTimeout(() => setShowAlert(false), 2000);
    };

    const beritaUtama = Array.isArray(beritaHome) ? beritaHome[0] : null;
    const teknologi = Array.isArray(beritaHome) ? beritaHome.slice(1, 7) : [];
    const indonesia = Array.isArray(beritaHome) ? beritaHome.slice(8, 14) : [];
    const recommended = Array.isArray(beritaHome) ? beritaHome.slice(15, 20) : [];

    if (isLoading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className="my-4">
            {/* Latest News */}
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

            <Row>
                <Col md={8} className="mb-4">
                    <h5 className="mb-3">Latest News</h5>
                    {beritaUtama && (
                        <Card>
                            <Card.Img
                                variant="top"
                                src={beritaUtama.multimedia?.[0]?.url || "https://via.placeholder.com/800x400"}
                                style={{ height: "400px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title>{beritaUtama.title}</Card.Title>
                                <Card.Text>{beritaUtama.abstract}</Card.Text>
                                <Stack direction="horizontal" gap={3}>
                                    <Button className="p-2" variant="primary" href={beritaUtama.url} target="_blank">
                                        Selengkapnya
                                    </Button>
                                    <Button className="p-2" variant="success" onClick={() => handleSave(beritaUtama)}>Simpan</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col md={4} className="mb-4">
                    <h5 className="mb-3">Recommended</h5>
                    {recommended.map((item, index) => (
                        <Card className="mb-3" key={index}>
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img
                                        src={item.multimedia?.[0]?.url || "https://via.placeholder.com/100x100"}
                                        style={{ height: "100px", objectFit: "cover" }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title className="small mb-1 text-truncate">{item.title}</Card.Title>
                                        {/* <small className="text-muted">{item.published_date}</small> */}
                                        <Button variant="link" href={item.url} target="_blank">
                                            Selengkapnya
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Col>
            </Row>

            {/* Teknologi Section */}
            <Row className="mb-4">
                <h5 className="mb-3">Teknologi</h5>
                {teknologi.map((item, index) => (
                    <Col md={4} key={index}>
                        <Card className="mb-4">
                            <Card.Img
                                variant="top"
                                src={item.multimedia?.[0]?.url || "https://via.placeholder.com/300x200"}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title className="text-truncate">{item.title}</Card.Title>
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

            {/* Crimestory Section */}
            <Row className="mb-4">
                <h5 className="mb-3">Indonesian</h5>
                {indonesia.map((item, index) => (
                    <Col md={4} key={index}>
                        <Card className="mb-4">
                            <Card.Img
                                variant="top"
                                src={item.multimedia?.[0]?.url || "https://via.placeholder.com/300x200"}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title className="text-truncate">{item.title}</Card.Title>
                                <Stack direction="horizontal" gap={3}>
                                    <Button className="p-2" variant="primary" href={indonesia.url} target="_blank">
                                        Selengkapnya
                                    </Button>
                                    <Button className="p-2" variant="success" onClick={() => handleSave(item)}>Simpan</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
