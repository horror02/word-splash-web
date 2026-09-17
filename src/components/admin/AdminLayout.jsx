import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, UserCog, LogOut, Menu, X, Feather } from "lucide-react";
import useAuthStore from "../../setup/stores/AuthStore";
import useUserStore from "../../setup/stores/UserStore";

const navItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/settings", icon: UserCog, label: "Profile Settings" },
];

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const authLogout = useAuthStore((state) => state.authLogout);
    const resetUserData = useUserStore((state) => state.resetUserData);
    const userData = useUserStore((state) => state.userData);
    const navigate = useNavigate();

    const handleLogout = () => {
        authLogout();
        resetUserData();
        navigate("/login");
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`;

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Word Splash logo" className="w-8 h-8" />
                    <span className="text-lg font-serif font-bold text-purple-600">Word Splash</span>
                </Link>
                <p className="text-xs text-gray-400 mt-1 ml-7">Admin Panel</p>
            </div>

            {userData?.name && (
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm">
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{userData.name}</p>
                            <p className="text-xs text-gray-400 truncate">{userData.email}</p>
                        </div>
                    </div>
                </div>
            )}

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink key={to} to={to} end={to === "/admin/dashboard"} className={navLinkClass}>
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
            <aside className="hidden md:flex md:w-64 flex-col bg-white/80 backdrop-blur-md border-r border-white/40 shadow-sm">
                <SidebarContent />
            </aside>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-64 flex flex-col bg-white z-50 shadow-xl transition-transform duration-300 md:hidden ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <SidebarContent />
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <div className="md:hidden flex items-center gap-4 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-600 hover:text-purple-600 transition"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <span className="font-serif font-bold text-purple-600">Word Splash Admin</span>
                </div>

                <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
