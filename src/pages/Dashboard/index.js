import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';

import Card from '../../components/Card';
import { BASE_URL, sendHttpRequest } from '../../common/api';

import './styles.css';

const Dashboard = () => {
  
  const [records, setRecord] = useState([]);
  const [count, setCount] = useState(0);
  const [patient, setpatients] = useState([]);
  
    const hospitalBeds = [
        {
            "id": "1",
            "name": "BED 1",
            "sensordata": [
                {"beat": "--", "spo2": "--", "temp": "--"}
            ]
        },
        {
            "id": "2",
            "name": "BED 2",
            "sensordata": [
                {"beat": "20", "spo2": "30", "temp": "15"}
            ]
        },
        {
            "id": "3",
            "name": "BED 3",
            "sensordata": [
                {"beat": "20", "spo2": "30", "temp": "15"}
            ]
        },
        {
            "id": "4",
            "name": "BED 4",
            "sensordata": [
                {"beat": "20", "spo2": "30", "temp": "15"}
            ]
        }
    ]
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        sendHttpRequest('GET', BASE_URL + '/allReading', null).then((data) => {
          if (data.status == 200) {
            // console.log(data)
            // records.push(data.data[0])
            setRecord(data.data[0])
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
          console.log(data)
          data.data.filter(pat => pat.bedNo === 1)
          setpatients(data.data)
        }
      }).catch((err) => {
        console.log(err);
      });
    }

  return (
    <div className="monitor-container">
      <div className="beds-container">
          <Card key={count} bedId={1} name={'Bed 1'} sensorData={records} />
          <Card key={2} bedId={2} name={'Bed 2'} sensorData={hospitalBeds[0].sensordata[0]} />
          <Card key={3} bedId={3} name={'Bed 3'} sensorData={hospitalBeds[0].sensordata[0]} />
          <Card key={4} bedId={4} name={'Bed 4'} sensorData={hospitalBeds[0].sensordata[0]} />
          <Card key={5} bedId={5} name={'Bed 5'} sensorData={hospitalBeds[0].sensordata[0]} />
          <Card key={6} bedId={6} name={'Bed 6'} sensorData={hospitalBeds[0].sensordata[0]} />
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   const hospitalBeds = state.hospitalBeds;
//   return { hospitalBeds };
// };

export default Dashboard;
