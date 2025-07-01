import React from 'react';
import styles from '../../dashboard/page.module.css'
import { useDashboard } from '@/contexts/dashboard-context';

const Menu = () => {
const { selectedMenu, setSelectedMenu, menuItems } = useDashboard();

  return (
    <div className={styles.menu}>
      <div className={styles.menuGrid}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.menuItem} ${
              selectedMenu === item.id ? styles.activeMenu : ""
            }`}
            onClick={() => setSelectedMenu(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu