import React from 'react';
import { Home, Layout, PieChart, User } from 'lucide-react';

const NavItem = ({ icon, label, active = false }) => {
    return (
        <button
            className={`flex flex-col items-center p-2 transition-colors
        ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
            {icon}
            <span className="text-xs mt-1">{label}</span>
        </button>
    );
};

const Navigation = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
            <div className="max-w-md mx-auto">
                <div className="flex justify-between items-center px-6 py-2">
                    <NavItem icon={<Home size={24} />} label="Home" active />
                    <NavItem icon={<Layout size={24} />} label="Routine" />
                    <NavItem icon={<PieChart size={24} />} label="Dashboard" />
                    <NavItem icon={<User size={24} />} label="My" />
                </div>
            </div>
        </div>
    );
};

export default Navigation;