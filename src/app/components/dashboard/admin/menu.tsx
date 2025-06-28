import React from 'react';
import styles from '../../../dashboard/admin/page.module.css'
import { FaServicestack, FaUser, FaCog, FaStethoscope } from 'react-icons/fa';

const Menu = () => {
  
  const menuItems = [
    { id: 'hospitals', label: (<><FaStethoscope /> &nbsp; Hospitals</>), link: '/dashboard/admin/hospitals' },
    { id: 'users', label: (<><FaUser /> &nbsp; Users</>), link: '/dashboard/admin/users' },
    { id: 'services', label: (<><FaServicestack /> &nbsp; Services</>), link: '/dashboard/admin/services' },
    { id: 'settings', label: (<><FaCog /> &nbsp; Settings</>), link: '/dashboard/admin/settings' },
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.menuGrid}>
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={styles.menuItem}
          >
            <a href={item.link}>
              {item.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu