import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../../style/background.css';
import { useNavigate } from "react-router";

const Landingpage = () => {
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);

  const handleManagerLinkClick = () => {
    setShowPasscodePrompt(true);
  };
  const navigate = useNavigate();

  const handlePasscodeSubmit = (event) => {
    event.preventDefault();
    const passcode = event.target.elements.passcode.value;
    if (passcode === '1111') {
      // TODO: handle successful passcode submission, e.g. navigate to manager page
      navigate("/managerPage")
    } else {
      alert('Incorrect passcode');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '28rem' }} className="mx-2 my-2 custom-card">
        <Card.Body className="text-center">
          <Card.Title>VVB</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">A starting point for an application.</Card.Subtitle>
          <p>You can choose your role as follows</p>
          <Card.Link href="#" onClick={handleManagerLinkClick}>
            MANAGER
          </Card.Link>
          <br />
          <p></p>
          <Card.Link href="/serverPage">SERVER</Card.Link>
          <p></p>
          {showPasscodePrompt && (
            <form onSubmit={handlePasscodeSubmit}>
              <label htmlFor="passcode">Enter passcode:</label>
              <input type="password" id="passcode" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Landingpage;
