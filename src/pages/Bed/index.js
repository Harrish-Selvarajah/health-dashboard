import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// import { connect } from 'react-redux';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import TimeSerieLineChart from '../../components/TimeSerieLineChart';
import ReportTable from '../../components/Report';
import { BASE_URL, sendHttpRequest } from '../../common/api';

import './styles.css';

const Bed = ({ name, deleteSensorData }) => {
  let { id } = useParams();

  const [records, setRecord] = useState([]);
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const recordss = [
    { "deviceId": "myFirstDevice", "windSpeed": 13.786287266480517, "temperature": 27.059010662714613, "humidity": 60.16157929750032 },
    { "deviceId": "myFirstDevice", "windSpeed": 13.786287266480517, "temperature": 27.059010662714613, "humidity": 60.16157929750032 },
    { "deviceId": "myFirstDevice", "windSpeed": 13.786287266480517, "temperature": 27.059010662714613, "humidity": 60.16157929750032 },
    { "deviceId": "myFirstDevice", "windSpeed": 13.786287266480517, "temperature": 27.059010662714613, "humidity": 60.16157929750032 },
    { "deviceId": "myFirstDevice", "windSpeed": 13.786287266480517, "temperature": 27.059010662714613, "humidity": 60.16157929750032 },
    { "deviceId": "myFirstDevice", "windSpeed": 13.786287266480517, "temperature": 27.059010662714613, "humidity": 60.16157929750032 },
    { "deviceId": "myFirstDevice", "windSpeed": 13.786287266480517, "temperature": 27.059010662714613, "humidity": 60.16157929750032 }
  ]

  useEffect(() => {
    // get api 
    console.log("hti")
    const intervalId = setInterval(() => {
      //   sensorCheckData(1 * 60 * 1000);
      sendHttpRequest('GET', 'https://health-dashboard-backend.herokuapp.com' + '/allReading', null).then((data) => {
        if (data.status == 200) {
          console.log(data)
          records.push(data.data[0])
          setRecord(records)
          const windSpeed = 10 + (Math.random() * 4);
          setCount(windSpeed)
          forceUpdate()
        }
      }).catch((err) => {
        console.log(err);
      });
    }, 4000);
    // setClock(new Date().toLocaleTimeString('pt-BR'));
    return () => {
      clearInterval(intervalId);
    };
  });

  // function useInterval(callback, delay, records) {
  //   debugger
  //   const savedCallback = useRef('');
  //   useEffect(() => {
  //     if (intervalId === true) {
  //       clearInterval(intervalId);
  //     }
  //     savedCallback.current = callback;
  //   }, [callback, records]);

  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       savedCallback.current();
  //     }, delay);
  //     setIntervalId(id);
  //     return () => clearInterval(id);
  //   }, [delay, records]);
  // }

  // useInterval(
  //   () => {
  //     sendHttpRequest('GET', 'http://localhost:8000' + '/allReading', null).then((data) => {
  //       if (data.status == 200) {
  //         console.log(data)

  //         records.push(data.data[0])
  //         setRecord(records)
  //         console.log(records)
  //         // count = count + 1 
  //         // setCount(count)
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   },
  //   4000,
  //   records
  // );

  const reportsData = [];

  return (
    <div>
      {/* <div className="sub-header-container">
        <p>{name}</p>
        <div className="time-label">
          <span>
            ID do Sensor: {id} - <TimeAgoLabel date={sensorData.timestamp} short={false} />
          </span>
          <button
            className="button"
            onClick={() => console.log("ll")}
            type="button"
            title="Deletar registros do sensor"
          >
            <MdDeleteSweep size={22} color="red" />
          </button>
        </div>
      </div> */}
      <div className="hospital-bed-container">
        <div className="hb-monitoring-container">
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>Cardio</h2>
              <div className="card-info-img"><FaHeartbeat size={64} /></div>
              <h2></h2>
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
                lineName="Freq. Cardíaca"
                tickStep={5}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>SpO2</h2>
              <div className="card-info-img"><GiLungs size={64} /></div>
              <h2></h2>
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
              <h2></h2>
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
        </div>
        <div className="hb-report-container">
          <p>{count}</p>
          <ReportTable className="hb-report-table" key={id} name={name} reports={reportsData} />
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   let id = ownProps.match.params.id;
//   const records = state.sensors[id].data;
//   const sensorData = records[records.length - 1];
//   const reportsData = state.reports[id].data;
//   const name = state.hospitalBeds.find((hospitalBed) => hospitalBed.sensorId === parseInt(id)).name;
//   return { name, records, sensorData, reportsData };
// };

export default Bed;
