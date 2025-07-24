import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo, useRef } from "react";
import UserMenu from "./UserMenu";

type NavItem = {
  id: string;
  title: string;
  href: string;
};

const Header = () => {
  const [activeNav, setActiveNav] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        id: "home",
        title: "الرئيسية",
        href: "/dashboard",
      },
      {
        id: "stores",
        title: "المتاجر",
        href: "/dashboard/stores",
      },
      {
        id: "users",
        title: "المستخدمين",
        href: "/dashboard/users",
      },
      {
        id: "marketing",
        title: "التسويق",
        href: "/dashboard/marketing",
      },
    ],
    []
  );

  useEffect(() => {
    const path = window.location.pathname;
    const currentNav = navItems.find((item) => path.startsWith(item.href));
    if (currentNav) {
      setActiveNav(currentNav.id);
    } else {
      setActiveNav("home");
    }
  }, [navItems]);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-3 md:p-4 relative z-30">
      <div className="flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Foodera</h1>
          </div>

          {/* mobile Menu */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeNav === item.id ? "default" : "ghost"}
                className={`${activeNav === item.id ? "bg-primary-blue text-white font-bold" : "text-gray-600 hover:text-primary"} transition-colors`}
                onClick={() => handleNavClick(item.id)}
                asChild>
                <a href={item.href}>{item.title}</a>
              </Button>
            ))}
          </nav>
        </div>

        {/* notifications and user */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="relative w-8 h-8 md:w-10 md:h-10">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute top-0 right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          <UserMenu userName="Admin" />
        </div>
      </div>

      {/* Mobile */}
      <div ref={mobileMenuRef} className={`md:hidden fixed inset-0 top-[69px] bg-black bg-opacity-30 transition-opacity duration-300 z-50 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-hidden={!mobileMenuOpen}>
        <div className={`bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"} h-auto max-h-[70vh] overflow-y-auto`}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`block py-3 px-4 rounded-md transition-colors duration-200 text-base font-medium ${activeNav === item.id ? "bg-primary-blue text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => {
                  handleNavClick(item.id);
                  setMobileMenuOpen(false);
                }}>
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
