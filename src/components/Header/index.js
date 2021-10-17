import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

import { AiOutlineHome, AiOutlineHistory, AiOutlineInfoCircle } from 'react-icons/ai';
import { FaUserNurse, FaBed } from 'react-icons/fa';
import { GiLabCoat, GiBunkBeds } from 'react-icons/gi';
// import { sensorCheckData } from '../../actions';

// import { DASHBOARD_NAME, MINUTES_TO_EXPIRE } from '../../../public/settings';
// import coppeImg from '../../assets/coppe.png';

import './styles.css';

const Header = ({ sensorCheckData }) => {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
    //   sensorCheckData(1 * 60 * 1000);
      setClock(new Date().toLocaleTimeString('pt-BR'));
    }, 1000);
    // setClock(new Date().toLocaleTimeString('pt-BR'));
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <header className="header-container">
      <div className="content">
        <h3>Health Dashboard</h3>
      </div>
      <div className="left-items-container">
        <div className="left-button-container">
          <Link className="button-link" to="/" title="Beds">
            <FaBed size={32} />
          </Link>
          <Link className="button-link" to="/history/doctor" title="Doctor Recmendation">
            <GiLabCoat size={32} />
          </Link>
          <Link className="button-link" to="/history/nurse" title="Nurse Recomendation">
            <FaUserNurse size={32} />
          </Link>
          <Link className="button-link" title="View Patient Details">
            <AiOutlineInfoCircle size={32} />
          </Link>
        </div>
      </div>
      <div className="clock-container">
        <h4>{clock}</h4>
      </div>
    </header>
  );
};

export default Header;
