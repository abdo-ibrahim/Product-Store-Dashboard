import React, { useState, useEffect } from "react";
import { FiHome, FiSettings, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { IoIosStats } from "react-icons/io";

type NavItem = {
  id: string;
  title: string;
  icon: IconType;
  href: string;
  specialClass?: string;
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(() => {
    return window.innerWidth >= 768;
  });
  const [activeItem, setActiveItem] = useState("dashboard");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      title: "الرئيسية",
      icon: FiHome,
      href: "#dashboard",
    },
    {
      id: "settings",
      title: "الإعدادات",
      icon: FiSettings,
      href: "#settings",
    },
    {
      id: "stats",
      title: "الإحصائيات",
      icon: IoIosStats ,
      href: "#stats",
    },
    {
      id: "shop",
      title: "المتجر",
      icon: FiShoppingCart,
      href: "#shop",
    },
    {
      id: "logout",
      title: "تسجيل خروج",
      icon: FiLogOut,
      href: "#logout",
      specialClass: "text-red-600 hover:text-red-700",
    },
  ];

  const handleNavClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className={`${isExpanded ? "w-64" : "w-16"} bg-primary-yellow shadow-lg border-l border-gray-200 flex flex-col transition-all duration-300`}>
      <div className="p-6 border-b border-primary-blue flex items-center justify-center">
        {isExpanded && <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>}
        <div onClick={() => setIsExpanded(!isExpanded)} className="p-2 mx-auto flex justify-center items-center cursor-pointer hover:bg-primary-blue hover:text-white rounded-full transition-colors">
          {isExpanded ? <IoArrowForwardCircleOutline className="w-8 h-8" /> : <IoArrowBackCircleOutline className="w-8 h-8" />}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-4">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => handleNavClick(item.id)}
            className={`w-full group ${isExpanded ? "justify-start gap-3" : "justify-center"} flex items-center h-12 px-4 py-3 rounded-md ${
              activeItem === item.id ? "bg-primary-blue text-white" : "hover:bg-primary-blue hover:text-white"
            } cursor-pointer transition-colors ${item.specialClass || ""} ${isExpanded ? "mx-0" : "mx-auto"}`}>
            {React.createElement(item.icon, {
              className: `w-5 h-5 flex-shrink-0 ${activeItem === item.id ? "text-white" : item.specialClass ? "group-hover:text-white" : "text-gray-700 group-hover:text-white"} transition-colors`,
            })}
            {isExpanded && <span>{item.title}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
