import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Step 1: Authenticate and get JWT
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.jwt;
        localStorage.setItem('jwt', token);

        // Step 2: Call /me to get user info
        const meResponse = await fetch('http://localhost:8080/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (meResponse.ok) {
          const userData = await meResponse.json();
          localStorage.setItem('username', userData.username);
          localStorage.setItem('role', userData.role);
          localStorage.setItem('intialPasswordChanged', userData.intialPasswordChanged);

          // Check if user must change initial password
          if (!userData.intialPasswordChanged) {
            navigate('/change-password'); // Force password change
          } else {
            navigate('/dashboard'); // Normal flow
          }
        } else {
          setErrorMessage('Failed to fetch user details.');
        }
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-setter">
          <img className="logo" src="/icon.png" alt="ABS Solutions" />
        </div>
        <h2 className="login-heading">Welcome</h2>
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
