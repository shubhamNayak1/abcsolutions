import React, { useEffect, useRef, useState } from 'react';

const InactivityLogoutHandler: React.FC = () => {
  const MAX_INACTIVE_TIME = 5 * 60 * 1000; // 5 minute
  const WARNING_TIME = 30 * 1000;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_TIME / 1000);

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('jwt');
    window.location.href = '/';
  };

  const resetTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    console.log('Resetting timers');

    setShowWarning(false);
    setCountdown(WARNING_TIME / 1000);

    timeoutRef.current = setTimeout(() => {
      console.log('Showing warning...');
      setShowWarning(true);
      startCountdown();
      warningRef.current = setTimeout(() => {
        console.log('Time’s up! Logging out...');
        logout();
      }, WARNING_TIME);
    }, MAX_INACTIVE_TIME);
  };

  const startCountdown = () => {
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];

    const handleActivity = () => {
      console.log('User activity detected');
      resetTimers();
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimers();

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <>
      {showWarning && (
        <div style={dialogStyle}>
          <p>You will be logged out in {countdown} seconds due to inactivity.</p>
          <p>Move your mouse or press any key to stay logged in.</p>
        </div>
      )}
    </>
  );
};

const dialogStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  border: '2px solid #333',
  padding: '20px',
  zIndex: 9999,
  boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
  textAlign: 'center',
};

export default InactivityLogoutHandler;
