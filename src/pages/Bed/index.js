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
  const [bedPatient, setPatient] = useState([]);
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
    sendHttpRequest('GET', BASE_URL + '/getPatients', null).then((data) => {
      if (data.status == 200) {
        bedPatient.push(data.data.filter(pat => pat.bedNo === 1))
        console.log(bedPatient)
        setPatient(bedPatient)
        // if (patient[0].heartRateThres < sensorData.heartrate || patient[0].bloodOxyThres < sensorData.spO2 || patient[0].roomTempThres > sensorData.roomTemp || patient[0].bodyTempThres > sensorData.bodyTemp || patient[0].ecgThres > sensorData.ecg || patient[0].co2Thres > sensorData.co2) {
        //     setAlert(true)
        // }
      }
    }).catch((err) => {
      console.log(err);
    });
  };


  const handleCreateToggle = () => {
    setShowCreateDocReco(!showCreateDocReco)
  };


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
                  <h6>Name: </h6>
                  <h6>Bed No: Harrish</h6>
                  <h6>Disease: Harrish</h6>
                  <h6>Age: Harrish</h6>
                  <h6>Blood Oxygen Threshold: Harrish</h6>
                  <h6>Heart rate Threshold: Harrish</h6>
                  <h6>Room Temp Threshold: Harrish</h6>
                  <h6>Body Temp Threshold: Harrish</h6>
                  <h6>ECG Threshold: Harrish</h6>
                  <h6>CO2 Threshold: Harrish</h6>
                  <Button onClick={handleCreateToggle}>EDIT</Button>
                </div>
              </div>
            </div>
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
                // value={formName}
                // onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Recomendation</Form.Label>
              <textarea   />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateToggle}>
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bed;
