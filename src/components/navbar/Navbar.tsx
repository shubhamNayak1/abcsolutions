import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser } from 'react-icons/fa';
import { LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const displayInitial = username ? username.charAt(0).toUpperCase() : 'U';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleMenuClick = (menu: string, path: string) => {
    setOpenMenu(null); // close menu
    navigate(path);    // navigate to page
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo-setter">
        <img className="logo" src="/icon.png" alt="ABS Solutions" />
      </div>

      <div className="nav-scrollable">
        {/* Dashboard */}
        <div
          className={`clickable-div ${openMenu === 'dashboard' ? 'clicked' : ''}`}
          onClick={() => handleMenuClick('dashboard', '/dashboard')}
        >
          <div className="subnavMenu">
            <div className="navlogo"><FaTachometerAlt size={25} /></div>
            <div className="navlogoTittle">Dashboard</div>
          </div>
        </div>

        {/* Admin */}
        <div className={`clickable-div ${openMenu === 'admin' ? 'clicked' : ''}`}>
          <div
            className="subnavMenu"
            onClick={() => setOpenMenu(openMenu === 'admin' ? null : 'admin')}
          >
            <div className="navlogo"><FaUser size={25} /></div>
            <div className="navlogoTittle">Admin</div>
          </div>

          {/* Show submenu only while hovering or until click */}
          {openMenu === 'admin' && (
            <div className="admin-submenu">
              <div onClick={() => handleMenuClick('admin-user', '/admin/user')}>Users</div>
              <div onClick={() => handleMenuClick('admin-group', '/admin/user-group')}>Groups</div>
              <div onClick={() => handleMenuClick('admin-department', '/admin/department')}>Departments</div>
              <div onClick={() => handleMenuClick('admin-password', '/admin/password-policy')}>Password&nbsp;Policy</div>
            </div>
          )}
        </div>
      </div>

      {/* Account section */}
      <div className="account" onClick={toggleAccountMenu}>
        {displayInitial}
        {accountMenuOpen && (
          <div className="account-menu">
            <div className="account-name">{username}</div>
            <hr />
            <div className="account-item" onClick={handleLogout}>
              Logout&nbsp;<LogOut />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
