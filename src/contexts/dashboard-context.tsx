"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type Role = "admin" | "hospital" | "doctor" | "user";

interface MenuItem {
  id: string;
  label: string | React.ReactNode;
}

interface DashboardContextType {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  menuItems: MenuItem[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboard must be used within a DashboardProvider"
    );
  }
  return context;
};

interface Props {
  role: Role;
  children: ReactNode;
}

export const DashboardProvider = ({ role, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const getMenuItems = (): MenuItem[] => {
    switch (role) {
      case "admin":
        return [
          { id: "home", label: "🏣 Dashboard" },
          { id: "users", label: "👥 Users"},
          { id: "services", label: "🛎️ Services" },
          { id: "settings", label: "⚙️ Settings" },
        ];
      case "hospital":
        return [
          { id: "profile", label: "🏥 Profile" },
          { id: "appointments", label: "📅 Appointments" },
          { id: "billing", label: "💳 Billing" },
          { id: "settings", label: "⚙️ Settings" },
        ];
      case "doctor":
        return [
          { id: "profile", label: "🩺 Profile" },
          { id: "schedule", label: "📅 Schedule" },
          { id: "settings", label: "⚙️ Settings" },
        ];
      case "user":
        return [
          { id: "profile", label: "🙍‍♂️ Profile" },
          { id: "appointments", label: "📅 Appointments" },
          { id: "settings", label: "⚙️ Settings" },
        ];
      default:
        return [];
    }
  };

  const defaultMenu = getMenuItems()[0]?.id;
  const validMenus = getMenuItems().map((m) => m.id);

  const [selectedMenu, setSelectedMenuState] = useState(defaultMenu);

  useEffect(() => {
    if (lastSegment && validMenus.includes(lastSegment)) {
      setSelectedMenuState(lastSegment);
    } else {
      router.replace(`/dashboard/${role}/${defaultMenu}`);
    }
  }, [lastSegment, pathname]);

  const setSelectedMenu = (menu: string) => {
    setSelectedMenuState(menu);
    router.push(`/dashboard/${role}/${menu}`);
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedMenu,
        setSelectedMenu,
        menuItems: getMenuItems(),
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};