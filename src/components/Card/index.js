import React from 'react';
import { useHistory } from 'react-router-dom';

import CardDetails from '../Card-Details';

import './styles.css';

const Card = ({ bedId, name, sensorData }) => {
    const isCardFlipped = false;
    const isDataExpired = false;
    const history = useHistory();

    const handleCardClick = () => {
        history.push(`/beds/${bedId}`);
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
