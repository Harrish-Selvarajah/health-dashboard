const settings = {
    DASHBOARD_NAME: 'Dashboard UTI 1',
    BROKER_URL: 'wss://mqtt.eclipse.org:443/mqtt',
    OXIMETERS_TOPIC: 'oximeters',
    ALERTS_TOPIC: 'alerts',
    RECORDS_TO_SAVE: 500,
    MINUTES_TO_EXPIRE: 1,
    HOSPITAL_BEDS: [
      { name: 'Leito 1', sensor_id: 1 },
      { name: 'Leito 2', sensor_id: 2 },
      { name: 'Leito 3', sensor_id: 3 },
      { name: 'Leito 4', sensor_id: 4 },
      { name: 'Leito 5', sensor_id: 5 },
      { name: 'Leito 6', sensor_id: 6 },
      { name: 'Leito 7', sensor_id: 7 },
      { name: 'Leito 8', sensor_id: 8 },
      { name: 'Leito 9', sensor_id: 9 },
      { name: 'Leito 10', sensor_id: 10 },
    ],
    REPORT_INTERVAL_MINUTES: 60,
  };
  