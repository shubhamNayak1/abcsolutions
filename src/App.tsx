import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Dashboard from './views/dashboard/dashboard';
import UserList from './views/admin/user/userList';
import UserAction from './views/admin/user/userAction/userAction';
import PasswordPolicy from './views/admin/passwordPolicy/passwordPolicy';
import DepartmentList from './views/admin/department/departmentList';
import DepartmentAction from './views/admin/department/departmentAction/departmentAction';
import Admin from './views/admin/admin';
import Login from './views/login/login';
import InactivityLogoutHandler from './components/InactivityLogoutHandler';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from './views/changePassword/ChangePassword';

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/';

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <div className={`content ${hideNavbarAndFooter ? 'navbar-hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/create"
            element={
              <ProtectedRoute>
                <UserAction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/password-policy"
            element={
              <ProtectedRoute>
                <PasswordPolicy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/department"
            element={
              <ProtectedRoute>
                <DepartmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/department/create"
            element={
              <ProtectedRoute>
                <DepartmentAction />
              </ProtectedRoute>
            }
          />

        {/* Catch-all route to redirect to dashboard */}    
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {!hideNavbarAndFooter}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <InactivityLogoutHandler />
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
