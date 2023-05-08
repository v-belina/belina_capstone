import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function ReportGenerator() {
  const [report, setReport] = useState(null);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [totalSum, setTotalSum] = useState(null);


  const handleGenerateReport = () => {
    const url = `/report/${date}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReport(data);
        setTotalSum(data.reduce((acc, item) => acc + item.price, 0));
      })
      .catch((error) => console.error(error));
      navigate(`/report/${date}`)
  };
  
  return (
    <div className="container">
      <Card
        className="text-center mx-2 my-2 custom-card d-flex flex-wrap justify-content-center"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>Pick a date for a report:</Card.Title>
          <input
            type="date"
            id="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button id="generate-report-btn" onClick={handleGenerateReport}>
            Generate Report
          </Button>

        </Card.Body>
      </Card>
    </div>
  );
}

export default ReportGenerator;
