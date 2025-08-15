import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser } from 'react-icons/fa';
import { TbPasswordUser } from "react-icons/tb";
import { LogOut } from 'lucide-react';
import './Navbar.css';
import DialogBox from '../dialogBox/dialogBox';

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(false);

  const handleResetPasswordOpen = () => {
    setResetPassword(true);
  };

  const handleResetPasswordClose = () => {
    setResetPassword(false);
  };

  const handleResetPasswordSave = () => {
  };

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

  const [submenuPos, setSubmenuPos] = useState({ top: 0 });

  const handleAdminClick = (e: { currentTarget: { getBoundingClientRect: () => any; }; }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSubmenuPos({ top: rect.top + 10});
    setOpenMenu(openMenu === 'admin' ? null : 'admin');
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
        <div className={`clickable-div ${openMenu === 'admin' ? 'clicked' : ''}`}
          onClick={handleAdminClick}
        >
          <div
            className="subnavMenu"
            onClick={() => setOpenMenu(openMenu === 'admin' ? null : 'admin')}
          >
            <div className="navlogo"><FaUser size={25} /></div>
            <div className="navlogoTittle">Admin</div>
          </div>

          {/* Show submenu only while hovering or until click */}
          {openMenu === 'admin' && (
            <div className="admin-submenu"
              style={{ top: submenuPos.top}}
            >
              <div onClick={() => handleMenuClick('admin-user', '/admin/user')}>Users</div>
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
            <div className="account-change" onClick={() => handleResetPasswordOpen()}>
              Change Password&nbsp;<TbPasswordUser size={40}/>
            </div>
            <div className="account-item" onClick={handleLogout}>
              Logout&nbsp;<LogOut />
            </div>
          </div>
        )}
      </div>
      <DialogBox
        isOpen={resetPassword}
        onClose={handleResetPasswordClose}
        onSave={handleResetPasswordSave}
        title={'Reset Password'}
      >
        <div className="input-password-group">
            <label htmlFor="password">Old Password</label>
            <input
              type="text"
              name="oldPassword"
              id="oldPassword"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
        </div>
        <div className="input-password-group">
            <label htmlFor="password">New Password</label>
            <input
              type="text"
              name="newPassword"
              id="newPassword"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
        </div>
        <div className="input-password-group">
            <label htmlFor="password">Re-Enter New Password</label>
            <input
              type="text"
              name="reEnterNewPassword"
              id="reEnterNewPassword"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
        </div>
      </DialogBox>
    </div>
  );
};

export default Navbar;
