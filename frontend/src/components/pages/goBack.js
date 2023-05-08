import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button bg="dark" variant="dark" onClick={goBack}>
      Go Back
    </Button>
  );
}

export default GoBackButton;
