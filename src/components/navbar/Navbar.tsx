import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaUsers, FaBuilding } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import './Navbar.css';
import { LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
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
        <div className="logo-setter">
          <img className="logo" src="/icon.png" alt="ABS Solutions" />
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
          </ul>
        </div>
        <div className="account" onClick={toggleAccountMenu}>
          {displayInitial}
          {accountMenuOpen && (
            <div className="account-menu">
              <div className="account-name">{username}</div>
              <hr />
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
