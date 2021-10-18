import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import TimeSerieLineChart from '../../components/TimeSerieLineChart';
import ReportTable from '../../components/Report';
import { BASE_URL, sendHttpRequest } from '../../common/api';

import './styles.css';

const Bed = () => {
  let { id } = useParams();

  const [records, setRecord] = useState([]);
  const [count, setCount] = useState(0);
  const [heartRate, setHeartRate] = useState('--');
  const [spo2, setspo2] = useState('--');
  const [bodyTemp, setBodyTemp] = useState('--');
  const [roomTemp, setRoomTemp] = useState('--');
  const [co2, setco2] = useState('--');
  const [ecg, setEcg] = useState('--');
  const [showCreateDocReco, setShowCreateDocReco] = useState(false);
  const [show, setShow] = useState(false);
  const [bedPatient, setPatient] = useState();
  const [name, setName] = useState('');
  const [bedNo, setBedNo] = useState('');
  const [disease, setDisease] = useState('');
  const [age, setAge] = useState('');
  const [bloodOxy, setO2] = useState('');
  const [heartRateThre, setHeartRateThre] = useState('');
  const [roomTempThre, setRoomTempThre] = useState('');
  const [roomBodyThre, setRoomBodyThre] = useState('');
  const [ecgThre, setEcgThre] = useState('');
  const [co2Thre, setCo2Thre] = useState('');

  const patient = [];

  useEffect(() => {
    // get api 
    getPatientDetails()
    const intervalId = setInterval(() => {
      sendHttpRequest('GET', BASE_URL + '/allReading', null).then((data) => {
        if (data.status == 200) {
          // console.log(data)
          records.push(data.data[0])
          setHeartRate(data.data[0].heartrate);
          setspo2(data.data[0].spO2);
          setBodyTemp(data.data[0].bodyTemp);
          setRoomTemp(data.data[0].roomTemp);
          setco2(data.data[0].co2);
          setEcg(data.data[0].ecg);
          // records.shift()
          if (records.length > 50) {
            records.shift()
          }
          setRecord(records)
          const windSpeed = 10 + (Math.random() * 4);
          setCount(windSpeed)
        }
      }).catch((err) => {
        console.log(err);
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  const getPatientDetails = () => {
    if (!name) {
      sendHttpRequest('GET', BASE_URL + '/getPatients', null).then((data) => {
        if (data.status == 200) {
          patient.push(data.data.filter(pat => pat.bedNo === 1))
          console.log(patient)
          setPatient(patient[0][0])
          setName(patient[0][0].name);
          setBedNo(patient[0][0].bedNo);
          setDisease(patient[0][0].infectedDisease);
          setAge(patient[0][0].age);
          setO2(patient[0][0].bloodOxyThres);
          setHeartRateThre(patient[0][0].heartRateThres);
          setRoomTempThre(patient[0][0].roomTempThres);
          setEcgThre(patient[0][0].ecgThres);
          setCo2Thre(patient[0][0].ecgThres);
          // if (patient[0].heartRateThres < sensorData.heartrate || patient[0].bloodOxyThres < sensorData.spO2 || patient[0].roomTempThres > sensorData.roomTemp || patient[0].bodyTempThres > sensorData.bodyTemp || patient[0].ecgThres > sensorData.ecg || patient[0].co2Thres > sensorData.co2) {
          //     setAlert(true)
          // }
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    
  };


  const handleCreateToggle = () => {
    setShowCreateDocReco(!showCreateDocReco)
  };

  const handleShowPopup = () => {
    setShow(!show)
  }

  const updatePatient = () => {
    const body = [
      {
          "id": bedPatient._id,
          "obj": [
              {
                  "name": name,
                  "age": age,
                  "bedNo": bedPatient.bedNo,
                  "phoneNumber": bedPatient.phoneNumber,
                  "adress": bedPatient.adress,   
                  "infectedDisease": disease,
                  "isDischared": bedPatient.isDischared,
                  "heartRateThres": heartRateThre,
                  "bloodOxyThres": bloodOxy,
                  "roomTempThres": roomTempThre,
                  "bodyTempThres": roomBodyThre,
                  "ecgThres": ecgThre,
                  "co2Thres": co2Thre
              }
          ]
      }
  ]
    sendHttpRequest('POST', BASE_URL + '/ceateRecomendation', null, body).then((data) => {
      if (data.status == 200) {
        console.log(data)
        handleCreateToggle()
        // setIsLoading(false);
      }
    }).catch((err) => {
      // setIsLoading(false);
      handleCreateToggle()
      console.log(err);
    });
  }

  const informDoc = () => {
    sendHttpRequest('POST', BASE_URL + '/sendSms', null, JSON.stringify({bedNo: bedPatient.bedNo})).then((data) => {
      if (data.status == 200) {
        console.log(data)
        handleShowPopup()
        // handleCreateToggle()
        // setIsLoading(false);
      }
    }).catch((err) => {
      // setIsLoading(false);
      handleCreateToggle()
      console.log(err);
    });
  }


  return (
    <div>
      <div className="hospital-bed-container">
        <div className="hb-monitoring-container">
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>Heart Rate</h2>
              <div className="card-info-img"><FaHeartbeat size={64} /></div>
              <h2>{heartRate}</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                key={count}
                data={records}
                dataKeyX="timestamp"
                dataKeyY="heartrate"
                syncId="anyId"
                fillColor="#2fc432"
                unit=" bpm"
                lineName="Freq Heart Rate"
                tickStep={5}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>SpO2</h2>
              <div className="card-info-img"><GiLungs size={64} /></div>
              <h2>{spo2}</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                key={count}
                data={records}
                dataKeyX="timestamp"
                dataKeyY="spO2"
                syncId="anyId"
                fillColor="#2076e0"
                unit=" %"
                lineName="SpO2"
                tickStep={5}
                fixedDomain={[(dataMin) => dataMin, 100]}
                rangeLimit={[0, 100]}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>Temperature</h2>
              <div className="card-info-img"><WiThermometer size={64} /></div>
              <h2>{bodyTemp}</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                key={count}
                data={records}
                dataKeyX="timestamp"
                dataKeyY="bodyTemp"
                syncId="anyId"
                fillColor="#e02041"
                unit=" ºC"
                lineName="Temperatura"
                tickStep={0.5}
                valueFormatter={(value) => Number(value).toFixed(1)}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>CO2</h2>
              <div className="card-info-img"><FaHeartbeat size={64} /></div>
              <h2>{co2}</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                key={count}
                data={records}
                dataKeyX="timestamp"
                dataKeyY="co2"
                syncId="anyId"
                fillColor="#2fc432"
                unit=" %"
                lineName="CO2"
                tickStep={5}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>ECG</h2>
              <div className="card-info-img"><FaHeartbeat size={64} /></div>
              <h2>{ecg}</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                key={count}
                data={records}
                dataKeyX="timestamp"
                dataKeyY="ecg"
                syncId="anyId"
                fillColor="#2fc432"
                unit=" %"
                lineName="ECG"
                tickStep={5}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>Room Temperature</h2>
              <div className="card-info-img"><FaHeartbeat size={64} /></div>
              <h2>{roomTemp}</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                key={count}
                data={records}
                dataKeyX="timestamp"
                dataKeyY="roomTemp"
                syncId="anyId"
                fillColor="#2fc432"
                unit=" ºC"
                lineName="Room temp"
                tickStep={5}
              />
            </div>
          </div>
        </div>
        <div className="hb-report-container">
          <ReportTable className="hb-report-table" key={id} name={`Bed 01`} reports={records} />
          <div className="card-container-holder-bed">
            <div className="card-container">
              <div className="card-face front-card-container">
                <div className="content">
                  <h6>Name: {name}</h6>
                  <h6>Bed No: {bedNo}</h6>
                  <h6>Disease: {disease}</h6>
                  <h6>Age: {age}</h6>
                  <h6>Blood Oxygen Threshold: {bloodOxy}</h6>
                  <h6>Heart rate Threshold: {heartRateThre}</h6>
                  <h6>Room Temp Threshold: {roomTempThre}</h6>
                  <h6>Body Temp Threshold: {roomBodyThre}</h6>
                  <h6>ECG Threshold: {ecgThre}</h6>
                  <h6>CO2 Threshold: {co2Thre}</h6>
                  <Button onClick={handleCreateToggle}>EDIT</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-container-holder-bed">
            <Button onClick={informDoc}>Inform Doctor</Button>
            {/* <Button onClick={handleCreateToggle}>EDIT</Button> */}
          </div>
        </div>
      </div>
      <Modal show={showCreateDocReco} onHide={handleCreateToggle} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bed No</Form.Label>
              <input
                type="text"
                value={bedNo}
                onChange={(e) => setBedNo(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Disease</Form.Label>
              <input
                type="text"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Blood Oxygen Threshold</Form.Label>
              <input
                type="text"
                value={bloodOxy}
                onChange={(e) => setO2(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Heart rate Threshold</Form.Label>
              <input
                type="text"
                value={heartRateThre}
                onChange={(e) => setHeartRateThre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room Temperatura Threshold</Form.Label>
              <input
                type="text"
                value={roomTempThre}
                onChange={(e) => setRoomTempThre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Body Temperatura Threshold</Form.Label>
              <input
                type="text"
                value={roomTempThre}
                onChange={(e) => setRoomBodyThre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ECG Threshold</Form.Label>
              <input
                type="text"
                value={ecgThre}
                onChange={(e) => setEcgThre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CO2 Threshold</Form.Label>
              <input
                type="text"
                value={co2Thre}
                onChange={(e) => setCo2Thre(e.target.value)}
              />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={updatePatient} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleShowPopup} size="sm">
                    {/* <Modal.Header closeButton>
                        <Modal.Title>Add Doctor Recomendation</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                        <div>Message delivered</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleShowPopup}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={createReco}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
    </div>
  );
};

export default Bed;
