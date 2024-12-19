import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Stack, Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from 'react-redux';
import { addArticle } from "../slice/savedSlice";
import useIndonesia from "../hooks/useIndonesia";
import useTechnology from "../hooks/useTechnology";
import useMostPopuler from "../hooks/useMostPopuler";

function Home() {
    const [beritaHome, setBeritaHome] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const dispatch = useDispatch();
    const API_KEY = process.env.REACT_APP_API_KEY;

    const {
        movieIndonesia,
    } = useIndonesia();

    const {
        beritaProgramming
    } = useTechnology();

    const {
        mostPopuler
    } = useMostPopuler();

    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${API_KEY}`)
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

    const saveIndonesian = (berita) => {
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

        setAlertMessage(`Article "${berita.headline.main}" Successfully saved!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const handleSave = (berita) => {
        dispatch(addArticle({
            title: berita.title,
            abstract: berita.abstract,
            multimedia: berita.multimedia,
            url: berita.url,
            published_date: berita.published_date,
        }));
        setAlertMessage(`Article "${berita.title}" Successfully saved!`);
        setShowAlert(true); // Tampilkan alert
        setTimeout(() => setShowAlert(false), 2000);
    };

    const beritaUtama = Array.isArray(beritaHome) ? beritaHome[0] : null;
    const teknologi = Array.isArray(beritaProgramming) ? beritaProgramming.slice(1, 7) : [];
    const indonesia = Array.isArray(movieIndonesia) ? movieIndonesia.slice(1, 7) : [];
    const populer = Array.isArray(mostPopuler) ? mostPopuler.slice(1, 6) : [];

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center min-vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

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
                                    See More
                                    </Button>
                                    <Button className="p-2" variant="success" onClick={() => handleSave(beritaUtama)}>Save</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col md={4} className="mb-4">
                    <h5 className="mb-3">Most Popular</h5>
                    {populer.map((item, index) => (
                        <Card className="mb-3" key={index}>
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img
                                        src={item.media?.[0]?.['media-metadata']?.[0]?.url || "https://via.placeholder.com/100x100"}
                                        style={{ height: "100px", objectFit: "cover" }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title className="small mb-1 text-truncate">{item.title}</Card.Title>
                                       
                                        <Button variant="link" href={item.url} target="_blank">
                                            See More
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
                <Stack direction="horizontal" gap={3}>
                    <div className="p-2" >
                        <h5>Technology </h5> </div>
                    <div className="p-2 ms-auto"></div>
                    <Button variant="link" href="/programming" >See More</Button>
                </Stack>

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

            {/* Indonesia Section */}
            <Row className="mb-4">
            <Stack direction="horizontal" gap={3}>
                    <div className="p-2" >
                        <h5>Indonesian </h5> </div>
                    <div className="p-2 ms-auto"></div>
                    <Button variant="link" href="/ind" >See More</Button>
                </Stack>
                {indonesia.map((item, index) => (
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
                                        See More
                                    </Button>
                                    <Button className="p-2" variant="success" onClick={() => saveIndonesian(item)}>
                                        Save
                                    </Button>
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
