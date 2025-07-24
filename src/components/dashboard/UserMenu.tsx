import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

type UserMenuProps = {
  userName: string;
  userEmail?: string;
};

const UserMenu = ({ userName, userEmail = "admin@example.com" }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 md:gap-2 cursor-pointer py-1 md:py-2 px-2 md:px-3 rounded-md hover:bg-gray-100 transition-colors">
        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
        </div>
        <div className="hidden sm:block">
          <span className="text-xs md:text-sm font-bold text-gray-700">{userName}</span>
        </div>
        <ChevronDown className="w-3 h-3 md:w-4 md:h-4 transition-transform" />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
          <a href="#settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Settings className="w-4 h-4 ml-2" />
            إعدادات الحساب
          </a>
          <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل خروج
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
