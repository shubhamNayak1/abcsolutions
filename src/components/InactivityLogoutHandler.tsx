import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InactivityLogoutHandler: React.FC = () => {
  const MAX_INACTIVE_TIME = 5 * 60 * 1000; // 1 minute for demo
  const WARNING_TIME = 30 * 1000; // 30 seconds before logout

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_TIME / 1000);

  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('jwt'));

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('jwt');
    navigate('/'); // Redirect to login
  };

  const resetTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

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
    // Only run if user is logged in and NOT on login page
    if (!isLoggedIn || location.pathname === '/') return;

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];

    const handleActivity = () => {
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
  }, [isLoggedIn, location.pathname]);

  if (!isLoggedIn || location.pathname === '/') {
    return null; // Don't render anything on login page or if not logged in
  }

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
