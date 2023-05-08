import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Report() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [totalSum, setTotalSum] = useState(null);
  const [totalItems, setTotalItems] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/report/${selectedDate}`);
      const data = response.data;
      setReportData(data);
      setTotalSum(data.totalSum);
      setTotalItems(data.totalItems);
      setSelectedDate(data.selectedDate);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <Card className="text-center mx-2 my-2 custom-card d-flex flex-wrap justify-content-center" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title><h3>REPORT</h3></Card.Title>
          <h6>Total Sum: {totalSum}</h6>
          
          <h6>Total Items: {totalItems}</h6>
          
          <h6>Date: {selectedDate}</h6>
        </Card.Body>
      </Card>
      <Button onClick={fetchData}>Fetch Data</Button>
    </div>
  );
}

export default Report;
