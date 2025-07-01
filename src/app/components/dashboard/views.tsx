"use client";

import React from 'react';
import Home from './admin/home';
import { useDashboard } from '@/contexts/dashboard-context';

const Views = () => {
  const { selectedMenu } = useDashboard();

  switch (selectedMenu) {
    case "home":
      return <Home />;
    case "users":
      return '👥 Users Management';
    case "services":
      return '🛎️ Services Panel';
    case "settings":
      return '⚙️ Settings';
    default:
      return '404 Not Found';
  }
};

export default Views;
