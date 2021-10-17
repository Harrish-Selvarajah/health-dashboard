import React from 'react';
import { CSVLink } from 'react-csv';

import { AiOutlineCloudDownload } from 'react-icons/ai';

import './styles.css';

const DownloadCSV = ({ reports, filename, title }) => {
  const headers = [
    { label: 'Data', key: '_ts' },
    { label: 'Heart Rate', key: 'heartrate' },
    { label: 'SpO2 (%)', key: 'spO2' },
    { label: 'Body Temperature (°C)', key: 'bodyTemp' },
    { label: 'Room Temperature (°C)', key: 'roomTemp' },
    { label: 'CO 2 (%)', key: 'co2' },
    { label: 'ECG', key: 'ecg' },
  ];

  const data = reports.map((report) => {
    let newReport = { ...report };
    newReport.timestamp = new Date(newReport.timestamp).toLocaleString('pt-BR');
    return newReport;
  });

  return (
    <CSVLink data={data} headers={headers} separator=";" filename={filename} target="_blank">
      <AiOutlineCloudDownload className="download-button" size={34} title={title} />
    </CSVLink>
  );
};

export default DownloadCSV;
