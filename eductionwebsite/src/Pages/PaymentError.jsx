import React, { useState, useEffect } from 'react';
import '../paymentFailed.css';
import { useNavigate } from 'react-router-dom';

const PaymentErrorPage = () => {
    const history = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setTimeout(() => {
            history('/courses');
        }, 10000);

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };
    }, [history],[countdown]);

    return (
        <div className="payment-failure">
            <h2>Payment Failed</h2>
            <p>Sorry, your payment could not be processed. Please try again later.</p>
            <p>
                If the payment was deducted from your account, please contact your bank for assistance.
            </p>
            <p>Redirecting to course page in <span> {countdown} </span> seconds...</p>
        </div>
    );
};

export default PaymentErrorPage;
