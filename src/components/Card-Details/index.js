import React, { useEffect } from 'react';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import './styles.css';

const CardDetails = ({ name, sensorData }) => {
  useEffect(() => {
    console.log('')
  }, [])

  return (
    <div className="content">
      <h2>{name}</h2>
      <div className="sensor-info">
        <FaHeartbeat size={32} />
        <p>{sensorData.heartrate} bpm</p>
      </div>
      <div className="sensor-info">
        <GiLungs size={32} />
        <p>{sensorData.spO2} %</p>
      </div>
      <div className="sensor-info">
        <WiThermometer size={32} />
        <p>{sensorData.bodyTemp} ºC</p>
      </div>
      <div className="sensor-info">
        <FaHeartbeat size={32} />
        <p>{sensorData.co2} %</p>
      </div>
      <div className="sensor-info">
        <FaHeartbeat size={32} />
        <p>{sensorData.ecg} %</p>
      </div>
      <div className="sensor-info">
        <WiThermometer size={32} />
        <p>{sensorData.roomTemp} ºC</p>
      </div>
    </div>
  );
};

export default CardDetails;
