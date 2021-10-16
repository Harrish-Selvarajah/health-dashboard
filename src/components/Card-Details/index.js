import React from 'react';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import './styles.css';

const CardDetails = ({ name, sensorData }) => {
  return (
    <div className="content">
      <h2>{name}</h2>
      <div className="sensor-info">
        <FaHeartbeat size={32} />
        <p>{sensorData.beat} bpm</p>
      </div>
      <div className="sensor-info">
        <GiLungs size={32} />
        <p>{sensorData.spo2} %</p>
      </div>
      <div className="sensor-info">
        <WiThermometer size={32} />
        <p>{sensorData.temp} ºC</p>
      </div>
    </div>
  );
};

export default CardDetails;
