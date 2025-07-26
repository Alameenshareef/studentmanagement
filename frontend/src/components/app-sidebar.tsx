import { Users, UserCheck, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function AppSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate("/auth/login", { replace: true });
  };

  const navItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      color: "text-sky-500",
    },
    {
      title: "Students",
      url: "/students",
      icon: Users,
      color: "text-emerald-500",
    },
    ...(user?.role === "SuperAdmin"
      ? [{
          title: "Staff",
          url: "/staff",
          icon: UserCheck,
          color: "text-violet-500",
        }]
      : []),
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
      color: "text-rose-500",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed sm:relative inset-y-0 left-0 z-40
        w-64 sm:w-20 md:w-64
        bg-white border-r border-gray-200
        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        transition-transform duration-200 ease-in-out
        flex flex-col h-full
      `}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SMS
              </span>
            </h1>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden sm:block p-1 rounded-md hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <a
                  href={item.url}
                  onClick={(e) => {
                    if (item.onClick) item.onClick(e);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    flex items-center p-3 rounded-lg
                    transition-all hover:bg-gray-50
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <div className={`p-2 rounded-md ${item.color} bg-opacity-20`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  {!isCollapsed && (
                    <span className="ml-3 font-medium text-gray-700 whitespace-nowrap">
                      {item.title}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-2 border-t border-gray-200 hidden sm:block">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-50"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">
                  Collapse
                </span>
              </>
            )}
          </button>
        </div>
      </aside>

      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );
}