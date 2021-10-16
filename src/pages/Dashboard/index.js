import React, { useEffect } from 'react';
// import { connect } from 'react-redux';

import Card from '../../components/Card';

import './styles.css';

const Monitor = () => {
    const hospitalBeds = [
        {
            "id": "1",
            "name": "BED 1",
            "sensordata": [
                {"beat": "20", "spo2": "30", "temp": "15"}
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
      
    });

  return (
    <div className="monitor-container">
      <div className="beds-container">
        {hospitalBeds ? hospitalBeds.map((hospitalBed, id) => (
          <Card key={id} bedId={id} name={hospitalBed.name} sensorData={hospitalBed.sensordata[0]} />
        )): <div> No Hospital Beds Found</div>}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   const hospitalBeds = state.hospitalBeds;
//   return { hospitalBeds };
// };

export default Monitor;
