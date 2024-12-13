import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Stack, Button, Alert } from "react-bootstrap";
import { addArticle } from "../slice/savedSlice";
import { useDispatch } from 'react-redux';

function Indonesia() {
    const [movieIndonesia, setmovieIndonesia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=indonesian&api-key=ftmLzO39nIIsE4BUruG9PayJCjvRkI2U")
                .then((response) => response.json())
                .then((data) => { setmovieIndonesia(data.response.docs); setIsLoading(false); })
                .catch((error) => { console.error("Error fetching movie utama:", error); setIsLoading(false); });
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    const handleSave = (berita) => {
        dispatch(addArticle({
            title: berita.headline.main,
            abstract: berita.abstract,
            multimedia: berita.multimedia && berita.multimedia.length > 0 ? "https://www.nytimes.com/" + berita.multimedia[0].url : "https://awsimages.detik.net.id/community/media/visual/2022/07/13/ilustrasi-baca-berita_169.jpeg?",
            url: berita.web_url,
            published_date: berita.pub_date,
        }));
        setAlertMessage(`Berita "${berita.headline.main}" berhasil disimpan!`); // Set pesan alert
        setShowAlert(true); // Tampilkan alert
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
            {isLoading ? (<div className="d-flex justify-content-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>) : <Row className="mb-4">
                <h5 className="mb-3">Indonesian</h5>
                {movieIndonesia.map((item, index) => (
                    <Col md={4} key={index}>
                        <Card className="mb-4">
                            <Card.Img
                                variant="top"
                                src={item.multimedia && item.multimedia.length > 0
                                    ? "https://www.nytimes.com/" + item.multimedia[0].url
                                    : "https://awsimages.detik.net.id/community/media/visual/2022/07/13/ilustrasi-baca-berita_169.jpeg?"}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title className="text-truncate">{item.headline.main}</Card.Title>
                                <Card.Text className="text-truncate">{item.abstract}</Card.Text>
                                <Stack direction="horizontal" gap={3}>
                                    <Button className="p-2" variant="primary" href={item.web_url} target="_blank">
                                        Selengkapnya
                                    </Button>
                                    <Button className="p-2" variant="success" onClick={() => handleSave(item)}>Simpan</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            }
        </Container>
    );
}

export default Indonesia;
