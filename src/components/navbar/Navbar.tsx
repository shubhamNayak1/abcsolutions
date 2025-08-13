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

  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);

  const toggleMenu = (menu: string, event?: React.MouseEvent) => {
    setOpenSubMenu(null);

    if (openMenu === menu) {
      setOpenMenu(null);
      setMenuPosition(null);
    } else {
      setOpenMenu(menu);

      if (event) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        setMenuPosition({
          top: rect.top, // top position relative to viewport
          left: rect.right, // right side of the navbar
        });
      }
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo-setter">
          <img className="logo" src="/icon.png" alt="ABS Solutions" />
        </div>
        <div className="nav-scrollable">
          <div className="navMenu">
            <Link
              to="/dashboard"
              onClick={() => toggleMenu('dashboard')}
              className={`clickable-div ${openMenu === 'dashboard' ? 'clicked' : ''}`}
            >
              <div className="subnavMenu">
                <div className="navlogo">
                  <FaTachometerAlt />
                </div>
                <div className="navlogoTittle">Dashboard</div>
              </div>
            </Link>
          </div>
          <div className="navMenu">
            <div
              onClick={(e) => {
                e.preventDefault(); // prevent default navigation so submenu can open
                toggleMenu('admin', e);
              }}
              // onClick={() => toggleMenu('admin')}
              className={`clickable-div ${openMenu === 'admin' ? 'clicked' : ''}`}
            >
              <div className="subnavMenu">
                <div className="navlogo">
                  <FaUser />
                </div>
                <div className="navlogoTittle">Admin</div>
              </div>
            </div>
            {openMenu === 'admin' && menuPosition && (
              <div
                className="admin-submenu"
                style={{
                  position: 'absolute',
                  top: menuPosition.top,
                  left: menuPosition.left + 20, // small gap from navbar
                }}
              >
                <Link
                  to="/admin/user"
                  onClick={() => toggleSubMenu('user')}
                  className={`clickable-div ${openSubMenu === 'user' ? 'subclicked' : ''}`}
                >
                  Users
                </Link>
                <Link
                  to="/admin/user-group"
                  onClick={() => toggleSubMenu('userGroup')}
                  className={`clickable-div ${openSubMenu === 'userGroup' ? 'subclicked' : ''}`}
                >
                  Groups
                </Link>
                <Link
                  to="/admin/department"
                  onClick={() => toggleSubMenu('department')}
                  className={`clickable-div ${openSubMenu === 'department' ? 'subclicked' : ''}`}
                >
                  Departments
                </Link>
                <Link
                  to="/admin/password-policy"
                  onClick={() => toggleSubMenu('passwordPolicy')}
                  className={`clickable-div ${openSubMenu === 'passwordPolicy' ? 'subclicked' : ''}`}
                >
                  Password&nbsp;policy
                </Link>
              </div>
            )}
          </div>
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
