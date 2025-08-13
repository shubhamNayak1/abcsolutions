import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Audit from './views/reportBuilder/reportBuilder/audit/audit';
import Dashboard from './views/dashboard/dashboard';
import Training from './views/training/training';
import TrainingType from './views/training/trainingType/TrainingType';
import ExamAction from './views/training/examAction/examAction';
import Coordinator from './views/training/coordinator/coordinator';
import Conference from './views/training/conference/conference';
import Vendor from './views/training/vendor/vendor';
import UserList from './views/admin/user/userList';
import UserAction from './views/admin/user/userAction/userAction';
import PasswordPolicy from './views/admin/passwordPolicy/passwordPolicy';
import UserGroupList from './views/admin/userGroup/userGroupList';
import DepartmentList from './views/admin/department/departmentList';
import DepartmentAction from './views/admin/department/departmentAction/departmentAction';
import ReportBuilder from './views/reportBuilder/reportBuilder';
import ReportBuilderUser from './views/reportBuilder/reportBuilder/userBuilder';
import Admin from './views/admin/admin';
import UserGroupAction from './views/admin/userGroup/userGroupAction/userGroupAction';
import Login from './views/login/login';
import NewUserInduction from './views/training/newUser/induction/NewUserInduction';
import TNI from './views/training/newUser/tni/TNI';
import TrainingTab from './views/training/trainingTab/TrainingTab';
import Compliance from './views/training/complianace/Compliance';
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
            path="/report-builder"
            element={
              <ProtectedRoute>
                <ReportBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-builder/user"
            element={
              <ProtectedRoute>
                <ReportBuilderUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <ProtectedRoute>
                <Audit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoute>
                <Training />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/process"
            element={
              <ProtectedRoute>
                <TrainingTab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/compliance"
            element={
              <ProtectedRoute>
                <Compliance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/type"
            element={
              <ProtectedRoute>
                <TrainingType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/create/add-exam"
            element={
              <ProtectedRoute>
                <ExamAction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/coordinator"
            element={
              <ProtectedRoute>
                <Coordinator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/conference"
            element={
              <ProtectedRoute>
                <Conference />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/vendor"
            element={
              <ProtectedRoute>
                <Vendor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/induction"
            element={
              <ProtectedRoute>
                <NewUserInduction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/tni"
            element={
              <ProtectedRoute>
                <TNI />
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
            path="/admin/user-group"
            element={
              <ProtectedRoute>
                <UserGroupList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-group/create"
            element={
              <ProtectedRoute>
                <UserGroupAction />
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
