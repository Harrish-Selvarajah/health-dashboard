import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import CardDetails from '../Card-Details';
import { BASE_URL, sendHttpRequest } from '../../common/api';

import './styles.css';

const Card = ({ bedId, name, sensorData, patient }) => {
    const isCardFlipped = false;
    // var isDataExpired = false;
    const [isDataExpired, setAlert] = useState(false);
    const history = useHistory();

    const handleCardClick = () => {
        history.push(`/beds/${bedId}`);
    }

    useEffect(() => {
        getPatientDetails()
    }, [])

    const getPatientDetails = () => {
        sendHttpRequest('GET', BASE_URL + '/getPatients', null).then((data) => {
            if (data.status == 200) {
                const patient = data.data.filter(pat => pat.bedNo === 1)
                console.log(patient)
                if (patient[0].heartRateThres < sensorData.heartrate || patient[0].bloodOxyThres < sensorData.spO2 || patient[0].roomTempThres > sensorData.roomTemp || patient[0].bodyTempThres > sensorData.bodyTemp || patient[0].ecgThres > sensorData.ecg || patient[0].co2Thres > sensorData.co2) {
                    setAlert(true)
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="card-container-holder">
            <div onClick={handleCardClick} className={isCardFlipped ? 'card-container is-flipped' : 'card-container'}>
                <div className="card-face front-card-container">
                    <div className={isDataExpired ? 'alert-bar expired' : 'alert-bar normal'} />
                    <CardDetails name={name} sensorData={sensorData} />
                </div>
                {/* <div className="card-face back-card-container">
                    <div className={isDataExpired ? 'alert-bar expired' : 'alert-bar normal'} />
                    <BackCard name={name} records={records} />
                    <div className="time-label">
                        <p>ID do Sensor: {sensorId}</p>
                        <TimeIntervalLabel start={records[0].timestamp} end={sensorData.timestamp} />
                    </div>
                    <button
                        className="button"
                        onClick={(event) => handleFlipCard(event)}
                        type="button"
                        title="Ver dados em tempo real"
                    >
                        <IoIosReturnLeft size={28} />
                    </button>
                    <button
                        className="button delete"
                        onClick={(event) => handleDeleteSensorData(event)}
                        type="button"
                        title="Deletar registros do sensor"
                    >
                        <MdDeleteSweep size={22} color="red" />
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Card;
