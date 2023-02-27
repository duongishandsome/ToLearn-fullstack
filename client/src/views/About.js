import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Row className="mx-auto mt-3">
                <Col className="text-center">
                    <Button variant="primary" onClick={handleShow}>
                        Launch
                    </Button>
                </Col>
            </Row>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you have chosen. Like, text,
                    images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default About;
