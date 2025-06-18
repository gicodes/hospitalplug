'use client';

import { auth } from '@/lib/firebase';
import styles from './page.module.css';
import CustomLogo from './assets/logo';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuth } from '@/app/components/context/auth-context';

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/discover', label: 'Discover' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleAuthMenu = () => setAuthMenuOpen((prev) => !prev);

  const { user, role, loading } = useAuth();

  return (
    <div className={styles.navbar}>
      <div className={styles.burger}>
        <div onClick={toggleMenu} className={styles.burgerToggle}>
          {menuOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
          <span>Menu</span>
        </div>

        {menuOpen && (
          <div className={styles.burgerMenu}>
            {menuLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        )}
      </div>

      <a href="#"><CustomLogo /></a>

      <div className={styles.navlinks}>
        {menuLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.navlink}>
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.navlinks}>
        {role === 'hospital' ? (
          <button className='btn-secondary'>See Subscription</button>
        ) : (
          <>
            <button className='btn-primary'>
              <a href='/auth/hospital/register'>Register a Hospital</a>
            </button>
            <button className='btn-secondary'>
              <a href='/auth/hospital'>Hospital Sign in</a></button>
          </>
        )}

        <div onClick={toggleAuthMenu}>
          {user ? (
            <img
              src={user.photoURL || '/default-avatar.png'}
              alt="User"
              className={styles.signedInUserIcon}
            />
          ) : (
            <FaUserCircle size={24}  className={styles.userIcon}/>
          )}
        </div>

        {authMenuOpen && (
          <div className={styles.authDropdown}>
            {user ? (
              <>
                <p><strong>{user.displayName || 'Untitled User'}</strong></p>
                <p>{user.email}</p>
                {role === 'hospital' && <a href="/hospital/dashboard">Dashboard</a>}
                {role === 'user' && <a href="/profile">Profile</a>}
                <button onClick={() => auth.signOut()}>Sign out</button>
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
