import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner, Stack, Button, Alert, Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addArticle } from '../slice/savedSlice';
import useIndonesia from '../hooks/useIndonesia';


const Indonesia = () => {
    const dispatch = useDispatch();
    const {
        movieIndonesia,
        isLoading,
        alertMessage,
        showAlert,
        setShowAlert,
        setAlertMessage,
    } = useIndonesia();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 
    const totalPages = Math.ceil(movieIndonesia.length / itemsPerPage);

    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentArticles = movieIndonesia.slice(indexOfFirstItem, indexOfLastItem);

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

        setAlertMessage(`Article "${berita.headline.main}" Successfully Saved!`);
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
                    <Row className="mb-4">
                        <h5 className="mb-3">Indonesian Articles</h5>
                        {currentArticles.map((item, index) => (
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
                                            <Button className="p-2" variant="success" onClick={() => handleSave(item)}>
                                                Save
                                            </Button>
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
};

export default Indonesia;
