import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  "../succes-page.css"  

const PaymentSuccess = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      // Redirect to the home page after 8 seconds
      navigate('/'); // You can replace '/' with the actual URL of your home page
    }
  }, [count, navigate]);

  return (
    <>
      <div className="card">
        <div>
          <i className="checkmark">✓</i>
        </div>
        <h1>Your payment was successful</h1>
        <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
        <p>Redirecting to home page in <span> {count} </span> seconds...</p>
      </div>
    </>
  );
};

export default PaymentSuccess;
