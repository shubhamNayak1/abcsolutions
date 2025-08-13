import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFileAlt,
  FaUser,
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaRoad,
} from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import {
  MdModelTraining,
  MdAssignmentAdd,
  MdIntegrationInstructions,
  MdOutlineMergeType,
} from 'react-icons/md';
import { AiOutlineAudit, AiFillSchedule } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { PiVideoConferenceFill } from 'react-icons/pi';

import './Navbar.css';
import { LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const displayInitial = username ? username.charAt(0).toUpperCase() : 'U';

  const toggleMenu = (menu: string) => {
    setOpenSubMenu(null);
    setOpenMenu(menu);
  };

  const toggleSubMenu = (subMenu: string) => {
    setOpenSubMenu(subMenu);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove token
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <>
      <div className="navbar">
        <div className='logo-setter'>
            <img className='logo' src="/icon.png" alt="ABS Solutions" />
        </div>
        <div className="nav-scrollable">
          <ul>
            <li>
              <Link
                to="/dashboard"
                onClick={() => toggleMenu('dashboard')}
                className={`clickable-div ${openMenu === 'dashboard' ? 'clicked' : ''}`}
              >
                <FaTachometerAlt />
                &nbsp;Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                onClick={() => toggleMenu('admin')}
                className={`clickable-div ${openMenu === 'admin' ? 'clicked' : ''}`}
              >
                <FaUser /> Admin
              </Link>
              {openMenu === 'admin' && (
                <ul>
                  <li className="subUlli">
                    <Link
                      to="/admin/user"
                      onClick={() => toggleSubMenu('user')}
                      className={`clickable-div ${openSubMenu === 'user' ? 'subclicked' : ''}`}
                    >
                      <FaUser /> Users
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/admin/user-group"
                      onClick={() => toggleSubMenu('userGroup')}
                      className={`clickable-div ${openSubMenu === 'userGroup' ? 'subclicked' : ''}`}
                    >
                      <FaUsers /> Groups
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/admin/department"
                      onClick={() => toggleSubMenu('department')}
                      className={`clickable-div ${openSubMenu === 'department' ? 'subclicked' : ''}`}
                    >
                      <FaBuilding /> Departments
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/admin/password-policy"
                      onClick={() => toggleSubMenu('passwordPolicy')}
                      className={`clickable-div ${openSubMenu === 'passwordPolicy' ? 'subclicked' : ''}`}
                    >
                      <RiLockPasswordFill /> Password policy
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/training"
                onClick={() => toggleMenu('training')}
                className={`clickable-div ${openMenu === 'training' ? 'clicked' : ''}`}
              >
                <FaRoad /> Trainings
              </Link>
              {openMenu === 'training' && (
                <ul>
                  <li className="subUlli">
                    <Link
                      to="/training/coordinator"
                      onClick={() => toggleSubMenu('coordinator')}
                      className={`clickable-div ${openSubMenu === 'coordinator' ? 'subclicked' : ''}`}
                    >
                      <MdIntegrationInstructions /> Coordinator
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/training/type"
                      onClick={() => toggleSubMenu('trainingType')}
                      className={`clickable-div ${openSubMenu === 'trainingType' ? 'subclicked' : ''}`}
                    >
                      <MdOutlineMergeType /> Type / Location
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/training/conference"
                      onClick={() => toggleSubMenu('conference')}
                      className={`clickable-div ${openSubMenu === 'conference' ? 'subclicked' : ''}`}
                    >
                      <PiVideoConferenceFill /> Conference
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/training/vendor"
                      onClick={() => toggleSubMenu('vendor')}
                      className={`clickable-div ${openSubMenu === 'vendor' ? 'subclicked' : ''}`}
                    >
                      <FaShop /> Vendor
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/training/induction"
                      onClick={() => toggleSubMenu('induction')}
                      className={`clickable-div ${openSubMenu === 'induction' ? 'subclicked' : ''}`}
                    >
                      <AiFillSchedule /> Induction
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/training/tni"
                      onClick={() => toggleSubMenu('tni')}
                      className={`clickable-div ${openSubMenu === 'tni' ? 'subclicked' : ''}`}
                    >
                      <AiFillSchedule /> TNI
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/training/process"
                      onClick={() => toggleSubMenu('createTraining')}
                      className={`clickable-div ${openSubMenu === 'createTraining' ? 'subclicked' : ''}`}
                    >
                      <MdModelTraining />
                      Schedule Training
                    </Link>
                  </li>
                  <li className="subUlli">
                    <Link
                      to="/training/compliance"
                      onClick={() => toggleSubMenu('planing')}
                      className={`clickable-div ${openSubMenu === 'planing' ? 'subclicked' : ''}`}
                    >
                      <AiFillSchedule /> Compliance
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/report-builder"
                onClick={() => toggleMenu('reportBuilder')}
                className={`clickable-div ${openMenu === 'reportBuilder' ? 'clicked' : ''}`}
              >
                <FaFileAlt /> Report Builder
              </Link>
              {openMenu === 'reportBuilder' && (
                <ul>
                  <li className="subUlli">
                    <Link
                      to="/report-builder/user"
                      onClick={() => toggleSubMenu('user')}
                      className={`clickable-div ${openSubMenu === 'user' ? 'subclicked' : ''}`}
                    >
                      <FaUser /> Create Report
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/audit"
                onClick={() => toggleMenu('audit')}
                className={`clickable-div ${openMenu === 'audit' ? 'clicked' : ''}`}
              >
                <AiOutlineAudit /> Audit
              </Link>
            </li>
          </ul>
        </div>
        <div className="account" onClick={toggleAccountMenu}>
          {displayInitial}
          {accountMenuOpen && (
            <div className="account-menu">
              <div className="account-name">{username}</div>
              <hr/>
              <div className="account-item" onClick={() => handleLogout()}>
                Logout&nbsp;
                <LogOut />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
