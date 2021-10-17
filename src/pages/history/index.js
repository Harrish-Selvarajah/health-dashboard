import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL, sendHttpRequest } from '../../common/api';

import './styles.css';

const History = () => {
    let { name } = useParams();
    const [showCreateDocReco, setShowCreateDocReco] = useState(false);
    const [formName, setName] = useState("");
    const [recomendation, setRecomendation] = useState("");
    const [recomendations, setRecomendations] = useState([]);
    const [loading, setLoader] = useState(false);

    useEffect(() => {
        // get api
        getRecos();
    }, [name]);

    const getRecos = () => {
        setLoader(true)
        sendHttpRequest('GET', BASE_URL + '/getRecomendation', { id: '616734b0ef26eb82424b731a' }).then((data) => {
            if (data.status == 200) {
                console.log(data)
                if (name === 'doctor') {
                    data.data.filter((item) => item.isDoctor ===true).map((recos) => {
                        recomendations.push(recos)
                    })
                    console.log(recomendations)
                    setLoader(false)
                } else {
                    data.data.filter((item) => item.isDoctor === false).map((recos) => {
                        recomendations.push(recos)
                    })
                    console.log(recomendations)
                    setLoader(false)
                }
            }
        }).catch((err) => {
            console.log(err);
            setLoader(false)
        });
    }

    const handleCreateToggle = () => {
        setShowCreateDocReco(!showCreateDocReco)
    };

    const createReco = () => {
        console.log(recomendation, formName)
        setLoader(true)
        sendHttpRequest('POST', BASE_URL + '/ceateRecomendation', null, JSON.stringify({ staffId: '6165c359d20e2acb68c2a534', staffName: formName, bedNo: '1', patientId: '616734b0ef26eb82424b731a', isDoctor: false, subject: recomendation })).then((data) => {
            if (data.status == 200) {
                setLoader(false)
                setShowCreateDocReco(!showCreateDocReco)
            }
        }).catch((err) => {
            setLoader(false)
            console.log(err);
            setShowCreateDocReco(!showCreateDocReco)
        });
    }

    const render = () => {
        if (loading) {
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )
        }

        return renderRecos();
    };

    const renderRecos = () => {
        const renderContent =
            <>
                {recomendations.map((item) => (
                    <div className="info-chart-container">
                        <div className="card-container card-chart-container">
                            <div>
                            <h5>Name: {item.staffName}</h5>
                            <h5>Time: {item.create_date}</h5>
                            <h5>Recomendation: {item.subject}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </>

        return (
            <>
                <div>
                    <div className="hospital-bed-container">
                        <div className="hb-monitoring-container">
                                {renderContent}
                        </div>
                        <div className="hb-report-container">
                            <Button onClick={handleCreateToggle}>ADD NEW</Button>

                        </div>

                    </div>
                </div>
                <Modal show={showCreateDocReco} onHide={handleCreateToggle} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Doctor Recomendation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <input
                                    type="text"
                                    value={formName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Recomendation</Form.Label>
                                <textarea value={recomendation} onChange={(e) => setRecomendation(e.target.value)} />
                            </Form.Group>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCreateToggle}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={createReco}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return <div>{render()}</div>;
};

export default History;