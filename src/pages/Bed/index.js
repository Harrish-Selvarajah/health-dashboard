import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import TimeSerieLineChart from '../../components/TimeSerieLineChart';
import ReportTable from '../../components/Report';
import { BASE_URL, sendHttpRequest } from '../../common/api';

import './styles.css';

const Bed = ({ name }) => {
  let { id } = useParams();

  const [records, setRecord] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // get api 
    console.log("hti")
    const intervalId = setInterval(() => {
      sendHttpRequest('GET', BASE_URL + '/allReading', null).then((data) => {
        if (data.status == 200) {
          console.log(data)
          records.push(data.data[0])
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

  const reportsData = [];

  return (
    <div>
      <div className="hospital-bed-container">
        <div className="hb-monitoring-container">
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>Heart Rate</h2>
              <div className="card-info-img"><FaHeartbeat size={64} /></div>
              <h2>{records? records[0].heartrate : '--'}</h2>
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
              <h2>{records? records[0].spO2 : '--'}</h2>
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
              <h2>{records? records[0].bodyTemp : '--'}</h2>
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
              <h2>{records? records[0].co2 : '--'}</h2>
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
              <h2>{records? records[0].ecg : '--'}</h2>
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
              <h2>{records? records[0].roomTemp : '--'}</h2>
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
          <ReportTable className="hb-report-table" key={id} name={name} reports={reportsData} />
        </div>
      </div>
    </div>
  );
};

export default Bed;
