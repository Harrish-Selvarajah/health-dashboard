import React, { useEffect, useState } from 'react';

import { FaHeartbeat } from 'react-icons/fa';

import TimeSerieLineChart from '../../components/TimeSerieLineChart';
// import ReportTable from '../../components/Report';
// import AppModal from '../../common/index'
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

const History = ({ name }) => {
    const [showCreateDocReco, setShowCreateDocReco] = useState(false);
    const [formName, setName] = useState("");
    const [recomendation, setRecomendation] = useState("");

    useEffect(() => {
        // get api 
    });

    const records = []

    const handleCreateToggle = () => {
        setShowCreateDocReco(!showCreateDocReco)
    };

    return (
        <>
            <div>
                <div className="hospital-bed-container">
                    <div className="hb-monitoring-container">
                        <div className="info-chart-container">
                            <div className="card-container card-chart-container">
                                <div>
                                    <h4>Doctor Name: Harrish</h4>
                                    <h4>Date: 01/01/2021</h4>
                                    <h4>Recomendation</h4>
                                </div>
                            </div>
                        </div>
                        <div className="info-chart-container">
                            <div className="card-container card-chart-container">
                                <div>
                                    <h4>Doctor Name: Harrish</h4>
                                    <h4>Date: 01/01/2021</h4>
                                    <h4>Recomendation</h4>
                                </div>
                            </div>
                        </div>
                        <div className="info-chart-container">
                            <div className="card-container card-chart-container">
                                <TimeSerieLineChart
                                    data={records}
                                    dataKeyX="timestamp"
                                    dataKeyY="temp"
                                    syncId="anyId"
                                    fillColor="#e02041"
                                    unit=" ºC"
                                    lineName="Temperatura"
                                    tickStep={0.5}
                                    valueFormatter={(value) => Number(value).toFixed(1)}
                                />
                            </div>
                        </div>
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
                    <Button variant="primary" onClick={handleCreateToggle}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default History;