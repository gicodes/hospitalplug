'use client';

import Image from 'next/image';
import styles from './page.module.css';
import CustomLogo from './assets/logo';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useLogout } from './hooks/useLogout';
import { useAuth } from '@/contexts/auth-context';

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover' },
  // { href: '/explore', label: 'Explore' },
];

const Header = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const toggleAuthMenu = () => setAuthMenuOpen((prev) => !prev);

  const { user, role } = useAuth();
  const logout = useLogout();

  return (
    <div className={styles.navbar}>
      <div className={styles.burger}>
        <div onClick={toggleMenu} className={styles.burgerToggle}>
          {menuOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
          <span> Menu</span>
        </div>

        { menuOpen && (
          <div className={styles.burgerMenu}>
            {menuLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        )}
      </div>

      <a href="#"> <CustomLogo /> </a>

      <div className={styles.navlinks}>
        {menuLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.navlink}>
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.navlinks}>
        { role!== 'user' &&  
          <>
            { role === 'hospital' ? (
              <div className={styles.flex}>
                <button className='btn-secondary'>See Subscription</button>
                <button className='btn-disabled'>Create Campaign</button>
              </div>
            ) : (
              <div className={styles.flex}>
                <button className='btn-primary'>
                  <a href='/auth/hospital/register'>Register Hospital</a>
                </button>
                <button className='btn-secondary'>
                  <a href='/auth/hospital'>Hospital Login</a>
                </button>
              </div>
            )}
          </>
        }
        
        <div id='auth-icon' onClick={toggleAuthMenu}>
          {user ? (
            <Image
              src={user?.image || '/user-default-img.png'}
              alt="User"
              className={styles.signedInUserIcon}
              width={32}
              height={32}
              objectFit='cover'
            />
          ) : (
            <FaUserCircle size={24} className={styles.userIcon}/>
          )}
        </div>

        {authMenuOpen && (
          <div id='auth-drop-down' className={styles.authDropdown}>
            {user ? (
              <>
                <div className={styles.authUserInfo}>
                  <p>{user.name ?? (user.role==='user' ? "Untitled User" : "Hospital X")}</p>
                  <span>{user.email}</span>
                </div>
                <a href={`/dashboard/${user.role}/[menu]`}>Dashboard</a>
                <button 
                  onClick={logout}
                  className='btn-tertiary'
                >
                  Sign out
                </button>
              </>
              ) : (
              <>
                <a href="/auth/user">User Sign in</a>
                <a href="/auth/user/register">User Sign up</a>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;