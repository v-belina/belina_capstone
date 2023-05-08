import React, { useState, useEffect } from 'react';

function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'transparent' }}>
      <p className="text-left" style={{ fontSize: '19px', marginBottom: '1', textAlign: 'left', right: 3 }}>
        Current time: {time}
        <p>
         Today's date: {date}
         </p>
      </p>
    </footer>
  );
}

export default Footer;
