import React from 'react';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';
import { FiClock } from 'react-icons/fi';

import DownloadCSV from '../Download-CSV';
import timeFormatter from '../../common/timeFormatter';

import './styles.css';

const Report = ({ name, reports }) => {
  return (
    <div className="report-container">
      <DownloadCSV
        title="Export CSV"
        reports={reports}
        filename={`${name}-${new Date().toLocaleString('pt-BR')}.csv`}
      />
      <div className="table-container">
        <table className="report-table">
          <div className="sensor-data-col">
            Download CSV
          </div>
        </table>
      </div>
    </div>
  );
};

export default Report;
