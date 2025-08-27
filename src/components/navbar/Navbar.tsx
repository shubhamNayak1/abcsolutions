import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSpaceDashboard,MdAdminPanelSettings } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);
  const [usernameDisplay, setUsernameDisplay] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsernameDisplay(storedUsername);
    }
  }, []);

  const displayInitial = usernameDisplay ? usernameDisplay.charAt(0).toUpperCase() : 'U';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleMenuClick = (menu: string, path: string) => {
    setOpenMenu(null); // close menu
    navigate(path);    // navigate to page
    setAccountMenuOpen(false);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

  const [submenuPos, setSubmenuPos] = useState({ top: 0 });

  const handleAdminClick = (e: { currentTarget: { getBoundingClientRect: () => any; }; }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSubmenuPos({ top: rect.top + 10});
    setOpenMenu(openMenu === 'admin' ? null : 'admin');
    setAccountMenuOpen(false);
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
            <div className="navlogo"><MdSpaceDashboard size={25} /></div>
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
            <div className="navlogo"><MdAdminPanelSettings size={30} /></div>
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
            <div className="account-name">{usernameDisplay}</div>
            <hr />
            <div className="account-change" onClick={() => handleMenuClick('admin-password', '/change-password')}>
              Change Password&nbsp;<TbPasswordUser size={40}/>
            </div>
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
